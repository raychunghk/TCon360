import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Staff, StaffContract } from '@prisma/client';
import { UpdateStaffDto } from 'src/models/customDTOs.js';
import { PrismaService } from '../../prisma/prisma.service.js';

// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed

@Injectable()
export class StaffService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  private readonly logger = new Logger(StaffService.name);

  async createContract(contract: Prisma.StaffContractUncheckedCreateInput) {
    try {
      const staffId = contract.staffId; // Retrieve the staffId from the contract object
      if (contract.IsActive) {
        await this.prisma.staffContract.updateMany({
          where: {
            staffId: staffId,
            IsActive: true, // Only update active contracts
          },
          data: {
            IsActive: false,
          },
        });
      }
      const createdContract = await this.prisma.staffContract.create({
        data: {
          ...contract,
        },
      });
      this.logger.log('New staff contract created:', createdContract);
      return createdContract;
    } catch (error) {
      this.logger.error('Error creating staff contract:', error);
      throw error;
    }
  }
  async updateStaffContract(
    id: number,
    updateStaffContractDto: Prisma.StaffContractUpdateInput,
  ): Promise<StaffContract> {
    try {
      const existingContract = await this.prisma.staffContract.findUnique({
        where: { id },
      });

      if (!existingContract) {
        throw new NotFoundException('Staff contract not found');
      }
      if (updateStaffContractDto.IsActive) {
        await this.prisma.staffContract.updateMany({
          where: {
            staffId: existingContract.staffId,
            IsActive: true, // Only update active contracts
          },
          data: {
            IsActive: false,
          },
        });
      }
      const updatedContract = await this.prisma.staffContract.update({
        where: { id },
        data: updateStaffContractDto,
      });
      Logger.log('update result', updatedContract);
      return updatedContract;
    } catch (error) {
      // Handle any potential errors
      Logger.error('error', error);
      throw new Error('Failed to update staff contract');
    }
  }
  async createStaff(
    stfInfo: Prisma.StaffCreateInput,
    _userId: string,
  ): Promise<Staff> {
    console.log(stfInfo);
    const stfWithUserId = { ...stfInfo, userId: _userId };
    const rtn = await this.prisma.staff.create({
      data: {
        ...stfInfo,
        user: { connect: { id: _userId } },
      },
    });
    console.log(rtn);
    return rtn;
  }
  getPrisma() {
    if (!this.prisma) {
      return new PrismaClient();
    } else {
      return this.prisma;
    }
  }

  async deleteContract(id: number): Promise<void> {
    try {
      await this.prisma.leaveRequest.deleteMany({
        where: {
          contractId: id,
        },
      });
      await this.prisma.staffContract.delete({ where: { id } });
    } catch (error) {
      Logger.log('error', error);
      throw new NotFoundException('Contract not found');
    }
  }
  async getStaffById(_id: number): Promise<Staff> {
    console.log('prisma ?' + this.prisma);
    const staff = await this.getPrisma().staff.findUnique({
      where: {
        id: _id,
      },
    });
    if (!staff) {
      throw new Error(`Staff member with ID ${_id} not found`);
    }
    return staff;
  }
  async updateStaff(id: number, data: UpdateStaffDto) {
    try {
      const { contracts, contractId, ...staffData } = data;

      const staff = await this.prisma.staff.update({
        where: { id },
        data: {
          ...staffData,
          contracts: {
            updateMany: contracts.map((contract) => ({
              where: { id: contract.id },
              data: {
                ContractStartDate: contract.ContractStartDate,
                ContractEndDate: contract.ContractEndDate,
                AnnualLeave: contract.AnnualLeave,
                IsActive: contract.IsActive,
              },
            })),
          },
        },
        include: {
          contracts: true,
        },
      });

      Logger.log('update result', staff);

      return staff;
    } catch (error) {
      console.log('update staff error', error);
    }
  }
  // async updateStaff(id: number, data: Prisma.StaffUpdateInput) {
  //   try {
  //     const rtn = await this.prisma.staff.update({
  //       where: { id },
  //       data,
  //     });
  //     Logger.log('rtn', rtn);
  //     console.log('update result');
  //     return rtn;
  //   } catch (error) {
  //     console.log('update staff error');
  //     console.log(error);
  //   }
  // }
}
