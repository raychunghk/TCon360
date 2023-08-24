import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import ical2json from 'ical2json';

import { isValid, parseISO, parse } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from 'src/customDto/customDTOs';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
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
    try {
      const holidays = await this.fetchPublicHolidays(icsJSONUrl);
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
