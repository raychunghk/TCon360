import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service.js';

import { Role, StaffContract, User } from '@prisma/client';
import { parse, parseISO, startOfDay } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { UpdateUserDto } from '../models/customDTOs.js';

@Injectable()
export class AdminService {
  private readonly prisma: PrismaService['client'];

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService.client;  // or prismaService.acceleratedClient
  }
  async getAllUsers() {
    return this.prisma.viewUserRole.findMany();
  }
  adjustDateTimezone(originalDate) {
    // element["DTSTART;VALUE=DATE"]
    let parsedval = parse(originalDate, 'yyyyMMdd', new Date());

    const timezoneOffset = -480; // UTC+8 in minutes
    let adjustedDate = new Date(
      parsedval.getTime() +
      parsedval.getTimezoneOffset() * 60000 +
      timezoneOffset * 60000,
    );

    return parsedval;
  }
  // adjust the date value to Hong Kong Time

  async userBackup(userId: string): Promise<any> {
    // Define an interface or a class for BackupData
    interface BackupData {
      // leaveRequests: any[]; // Replace 'any' with the actual type of leaveRequest
      // staffContracts: any[]; // Replace 'any' with the actual type of staffContract
      // activeStaffContract: any | null; // Replace 'any' with the actual type of staffContract
      staff: any[]; // Replace 'any' with the actual type of staff
      //staffFiles: any[]; // Replace 'any' with the actual type of staffFile
      // user: any; // Replace 'any' with the actual type of user
    }
    console.log('Now backing up for user id:', userId);
    const staff = await this.prisma.staff.findMany({
      where: { userId },
      include: {
        // Use include to eagerly load relations
        user: true, // Include related user data
        leaveRequests: true,
        contracts: true,
        //   staffFiles: true,
      },
    });

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    const leaveRequests = staff.flatMap((s) => s.leaveRequests);
    const staffContracts = staff.flatMap((s) => s.contracts);
    // const staffFiles = staff.flatMap((s) => s.staffFiles);

    // Find the active contract (if any)
    let activeStaffContract: StaffContract | null = null;
    for (const contract of staffContracts) {
      if (contract.IsActive) {
        activeStaffContract = contract;
        break; // Assuming only one contract can be active at a time
      }
    }

    const backupData: { backupData: BackupData } = {
      // Wrap in "backupData" object
      backupData: {
        staff,

        //  user,
      },
    };

    const jsonStringData = JSON.stringify(backupData, null, 2);

    //const jsonStringData = JSON.stringify(userData, null, 2); // Stringify with pretty printing (optional)
    return jsonStringData;
  }
  icsFilePath() {
    const prismaDirectory = 'prisma';
    let filePath;

    const customPath = path.join(process.cwd(), prismaDirectory);
    const defaultPath = path.join(__dirname, '..', '..', prismaDirectory);

    const possiblePaths = [customPath, defaultPath];

    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        filePath = possiblePath;
        break;
      }
    }

    if (!filePath) {
      fs.mkdirSync(customPath, { recursive: true });
      filePath = customPath;
    }

    filePath = path.join(filePath, 'hkholiday.ics');
    return filePath;
  }
  async fetchPublicHolidays(url): Promise<any[]> {
    const response = await axios.get(
      //   'https://www.1823.gov.hk/common/ical/tc.json',
      url,
    );
    const jsonData = response.data;
    const vevents = jsonData.vcalendar[0].vevent;

    const holidays = vevents.map((vevent) => {
      const dtstart = parseISO(vevent.dtstart[0]);
      const dtend = parseISO(vevent.dtend[0]);
      const summary = vevent.summary;

      return {
        dtstart,
        dtend,
        summary,
      };
    });

    return holidays;
  }

  async restoreUserData(staffArray: any[]) {
    for (const staffMember of staffArray) {
      try {
        // Extract user, staff data, leaveRequests, contracts, and staffFiles
        const { user, leaveRequests, contracts, staffFiles, ...staffData } =
          staffMember;

        // Upsert the user data
        const restoredUser = await this.prisma.user.upsert({
          where: { username: user.username }, // Use a unique field
          update: user,
          create: user,
        });
        console.log('Restoring user data for:', restoredUser);

        // Upsert the staff data
        const restoredStaff = await this.prisma.staff.upsert({
          where: { id: staffData.id },
          update: { ...staffData, userId: restoredUser.id },
          create: { ...staffData, userId: restoredUser.id },
        });
        console.log(`Successfully restored staff data for ID: ${staffData.id}`);

        // Upsert contracts and create a mapping for contract IDs
        const contractIdMap: { [key: number]: number } = {}; // Explicit type

        // 1. Get existing active contracts for this staff member BEFORE upserting
        const existingActiveContracts =
          await this.prisma.staffContract.findMany({
            where: {
              staffId: restoredStaff.id,
              IsActive: true,
              IsArchived: false,
            },
          });

        const replacedContractIds: number[] = []; // To store IDs of contracts being replaced

        for (const contract of contracts) {
          // Parse and normalize dates to the start of the day
          const contractStartDate = contract.ContractStartDate
            ? startOfDay(new Date(contract.ContractStartDate))
            : null;
          const contractEndDate = contract.ContractEndDate
            ? startOfDay(new Date(contract.ContractEndDate))
            : null;

          // Validate dates after parsing
          if (
            contract.ContractStartDate &&
            isNaN(contractStartDate.getTime())
          ) {
            console.warn(
              `Invalid ContractStartDate: ${contract.ContractStartDate}. Skipping contract.`,
            );
            continue; // Skip this contract if the start date is invalid
          }

          if (contract.ContractEndDate && isNaN(contractEndDate.getTime())) {
            console.warn(
              `Invalid ContractEndDate: ${contract.ContractEndDate}. Skipping contract.`,
            );
            continue; // Skip this contract if the end date is invalid
          }

          // Check if a contract with the same properties already exists
          const existingContract = await this.prisma.staffContract.findFirst({
            where: {
              staffId: restoredStaff.id,
              ContractStartDate: contractStartDate,
              ContractEndDate: contractEndDate,
              AnnualLeave: contract.AnnualLeave,
            },
          });

          if (existingContract) {
            // Update the existing contract
            const updatedContract = await this.prisma.staffContract.update({
              where: { id: existingContract.id },
              data: {
                IsActive: contract.IsActive, // Update IsActive and any other relevant fields
                IsArchived: false, // Ensure it's not archived during update
              },
            });
            contractIdMap[contract.id] = updatedContract.id;
            console.log(
              `Updated existing contract with ID ${existingContract.id}`,
            );
          } else {
            // Create a new contract
            const createdContract = await this.prisma.staffContract.create({
              data: {
                ContractStartDate: contractStartDate,
                ContractEndDate: contractEndDate,
                AnnualLeave: contract.AnnualLeave,
                IsActive: contract.IsActive,
                IsArchived: false, // Ensure new contracts are not archived
                staffId: restoredStaff.id,
              },
            });
            contractIdMap[contract.id] = createdContract.id;
            console.log(`Created new contract with ID ${createdContract.id}`);
          }
        }

        // 2. Archive the old active contracts that are NOT in the restored data
        for (const existingContract of existingActiveContracts) {
          const contractIsInRestoredData = contracts.some(
            (restoredContract) =>
              startOfDay(
                new Date(restoredContract.ContractStartDate),
              ).getTime() ===
              startOfDay(
                new Date(existingContract.ContractStartDate),
              ).getTime() &&
              startOfDay(
                new Date(restoredContract.ContractEndDate),
              ).getTime() ===
              startOfDay(
                new Date(existingContract.ContractEndDate),
              ).getTime() &&
              restoredContract.AnnualLeave === existingContract.AnnualLeave,
          );

          if (!contractIsInRestoredData) {
            // This contract is not in the restored data, so archive it
            await this.prisma.staffContract.update({
              where: { id: existingContract.id },
              data: {
                IsActive: false,
                IsArchived: true,
              },
            });
            replacedContractIds.push(existingContract.id);
            console.log(`Archived old contract with ID ${existingContract.id}`);
          }
        }

        // Upsert staffFiles and create a mapping for file IDs
        const fileIdMap: { [key: number]: number } = {};
        for (const file of staffFiles) {
          const restoredFile = await this.prisma.staffFiles.upsert({
            where: { id: file.id }, // Assuming staff file has a unique ID
            update: {
              filePath: file.filePath,
              fileType: file.fileType,
              staffId: restoredStaff.id, // Associate with the restored staff
            },
            create: {
              filePath: file.filePath,
              fileType: file.fileType,
              staffId: restoredStaff.id, // Associate with the restored staff
            },
          });
          fileIdMap[file.id] = restoredFile.id; // Map original file ID to new file ID
        }

        // Update leave requests
        for (const request of leaveRequests) {
          const existingLeaveRequest = await this.prisma.leaveRequest.findFirst(
            {
              where: {
                staffId: restoredStaff.id,
                leavePeriodStart: request.leavePeriodStart,
                leavePeriodEnd: request.leavePeriodEnd,
                leaveType: request.leaveType,
                leavePurpose: request.leavePurpose,
              },
            },
          );

          const contractId = contractIdMap[request.contractId] || null;

          if (existingLeaveRequest) {
            // Update the existing leave request
            await this.prisma.leaveRequest.update({
              where: { id: existingLeaveRequest.id },
              data: {
                AMPMStart: request.AMPMStart,
                AMPMEnd: request.AMPMEnd,
                leaveDays: request.leaveDays,
                dateOfReturn: request.dateOfReturn,
                staffSignDate: request.staffSignDate,
                fileId: fileIdMap[request.fileId] || null, // Use the mapped file ID
                contractId: contractId, // Use the mapped contract ID
                IsArchived: false, // Ensure it's not archived during update
              },
            });
            console.log(
              `Updated existing leave request with ID ${existingLeaveRequest.id}`,
            );
          } else {
            // Create a new leave request
            await this.prisma.leaveRequest.create({
              data: {
                leavePeriodStart: request.leavePeriodStart,
                AMPMStart: request.AMPMStart,
                leavePeriodEnd: request.leavePeriodEnd,
                AMPMEnd: request.AMPMEnd,
                leaveDays: request.leaveDays,
                dateOfReturn: request.dateOfReturn,
                staffSignDate: request.staffSignDate,
                leavePurpose: request.leavePurpose,
                leaveType: request.leaveType,
                fileId: fileIdMap[request.fileId] || null, // Use the mapped file ID
                contractId: contractId, // Use the mapped contract ID
                staffId: restoredStaff.id,
                IsArchived: false, // Ensure new leave requests are not archived
              },
            });
            console.log(`Created new leave request`);
          }
        }

        // 3. Archive leave requests associated with the replaced contracts
        await this.prisma.leaveRequest.updateMany({
          where: {
            contractId: {
              in: replacedContractIds,
            },
          },
          data: {
            IsArchived: true,
          },
        });
        console.log(
          `Archived leave requests associated with replaced contracts: ${replacedContractIds.join(
            ', ',
          )}`,
        );
      } catch (error) {
        console.error(
          `Error restoring data for staff member ID ${staffMember.id}:`,
          error,
        );
        throw error;
      }
    }
  }

  async createHolidayRecords(holidays: any[]): Promise<void> {
    await this.prisma.publicHoliday.deleteMany();
    for (const holiday of holidays) {
      await this.prisma.publicHoliday.create({
        data: {
          StartDate: holiday.dtstart,
          EndDate: holiday.dtend,
          Summary: holiday.summary,
        },
      });
    }
  }
  async createPublicHoliday(icsJSONUrl: string) {
    icsJSONUrl = icsJSONUrl || 'https://www.1823.gov.hk/common/ical/tc.json';
    try {
      const holidays = await this.fetchPublicHolidays(icsJSONUrl);
      console.log(holidays);
      await this.createHolidayRecords(holidays);
      await this.gencalendar();
      console.log('Public holiday records generated successfully.');
    } catch (error) {
      console.error('Error generating public holiday records:', error);
    }
  }
  async getAllRoles(): Promise<Role[]> {
    try {
      const roles = await this.prisma.role.findMany();
      return roles;
    } catch (error) {
      console.error('Failed to get roles:', error);
      throw new Error('Failed to get roles');
    }
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      console.log('error', error);
      // Handle the error appropriately (e.g., log, throw custom error)
      throw new Error('Failed to update user');
    }
  }
  async gencalendar() {
    try {
      await this.prisma.calendarMaster.deleteMany(); // Delete all records from CalendarMaster table

      let locale = 'en-US';
      var startyear = new Date().getFullYear();
      var endyear = startyear / 1 + 4;

      var currentdate = new Date('12/31/2022');
      var datenow = new Date(currentdate);
      var enddate = new Date(`12/31/${endyear}`);

      console.log(enddate);
      while (currentdate < enddate) {
        //while (false) {
        datenow.setDate(currentdate.getDate() + 1);
        datenow.toLocaleDateString();
        let weekdayname = datenow.toLocaleDateString(locale, {
          weekday: 'long',
        });
        let year = datenow.getUTCFullYear();
        let month = datenow.getUTCMonth() + 1;
        let ts = datenow.getTime() / 1000;

        // console.log(
        //   `date: ${datenow}, weekname: ${weekdayname}, month: ${month}, year : ${year}, timestamp: ${ts}`,
        // );
        const calendar = await this.prisma.calendarMaster.create({
          data: {
            CalendarDate: datenow,
            WeekDayName: weekdayname,
            Year: year,
            Month: month,
          },
        });
        currentdate = datenow;
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
