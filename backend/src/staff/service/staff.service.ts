import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Staff, StaffContract } from '@prisma/client';
import { UpdateStaffDto } from '../../models/customDTOs.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class StaffService {
  private readonly logger = new Logger(StaffService.name);

  //constructor(private readonly prisma: PrismaService['client']) { }
  constructor(private prisma: PrismaService) { }
  psm = this.prisma.client;
  async createContract(contract: Prisma.StaffContractUncheckedCreateInput): Promise<StaffContract> {
    try {
      const { staffId, IsActive } = contract;

      if (IsActive) {
        await this.psm.staffContract.updateMany({
          where: { staffId, IsActive: true },
          data: { IsActive: false },
        });
      }

      const createdContract = await this.psm.staffContract.create({
        data: contract,
      });

      this.logger.log(`New staff contract created: ID ${createdContract.id}`);
      return createdContract;
    } catch (error) {
      this.logger.error('Error creating staff contract', error);
      throw error;
    }
  }

  async updateStaffContract(
    id: number,
    updateDto: Prisma.StaffContractUpdateInput,
  ): Promise<StaffContract> {
    try {
      const existingContract = await this.psm.staffContract.findUnique({
        where: { id },
      });

      if (!existingContract) {
        throw new NotFoundException('Staff contract not found');
      }

      if (updateDto.IsActive === true) {
        await this.psm.staffContract.updateMany({
          where: { staffId: existingContract.staffId, IsActive: true },
          data: { IsActive: false },
        });
      }

      const updatedContract = await this.psm.staffContract.update({
        where: { id },
        data: updateDto,
      });

      this.logger.log(`Staff contract updated: ID ${updatedContract.id}`);
      return updatedContract;
    } catch (error) {
      this.logger.error('Error updating staff contract', error);
      throw error instanceof NotFoundException ? error : new Error('Failed to update staff contract');
    }
  }

  async createStaff(stfInfo: Prisma.StaffCreateInput, userId: string): Promise<Staff> {
    try {
      const staff = await this.psm.staff.create({
        data: {
          ...stfInfo,
          user: { connect: { id: userId } },
        },
      });

      this.logger.log(`Staff created: ID ${staff.id}`);
      return staff;
    } catch (error) {
      this.logger.error('Error creating staff', error);
      throw error;
    }
  }

  async deleteContract(id: number): Promise<void> {
    try {
      await this.psm.$transaction([
        this.psm.leaveRequest.deleteMany({ where: { contractId: id } }),
        this.psm.staffContract.delete({ where: { id } }),
      ]);
    } catch (error) {
      this.logger.error(`Error deleting contract ID ${id}`, error);
      throw new NotFoundException('Contract not found or already deleted');
    }
  }

  async getStaffById(id: number): Promise<Staff> {
    const staff = await this.psm.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }

    return staff;
  }

  async updateStaff(id: number, data: UpdateStaffDto): Promise<Staff & { contracts: StaffContract[] }> {
    try {
      const { contracts, ...staffData } = data;

      const updatedStaff = await this.psm.staff.update({
        where: { id },
        data: {
          ...staffData,
          contracts: contracts
            ? {
              updateMany: contracts.map((contract) => ({
                where: { id: contract.id },
                data: {
                  ContractStartDate: contract.ContractStartDate,
                  ContractEndDate: contract.ContractEndDate,
                  AnnualLeave: contract.AnnualLeave,
                  IsActive: contract.IsActive,
                },
              })),
            }
            : undefined,
        },
        include: { contracts: true },
      });

      this.logger.log(`Staff updated: ID ${updatedStaff.id}`);
      return updatedStaff;
    } catch (error) {
      this.logger.error(`Error updating staff ID ${id}`, error);
      throw error;
    }
  }
}