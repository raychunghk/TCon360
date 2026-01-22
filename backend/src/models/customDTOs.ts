import { PartialType } from '@nestjs/swagger';
import { StaffContract } from '@prisma/client';

import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  name?: string;
  email?: string;
  roleId?: number;
  userStatus?: string;
}
export interface LoginDto {
  identifier: string;
  password: string;
}
class UpdateContractDto {
  @IsDateString()
  ContractStartDate: Date;

  @IsDateString()
  ContractEndDate: Date;

  @IsInt()
  AnnualLeave: number;
  @IsInt()
  id: number;
  IsActive: any;
}

export class UpdateStaffDto {
  // Existing fields

  StaffName: string;
  AgentName: string;
  StaffCategory: string;
  Department: string;
  PostUnit: string;
  ManagerName: string;
  ManagerTitle: string;
  ManagerEmail: string;

  // New fields for multiple contracts
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateContractDto)
  contracts: UpdateContractDto[];

  // Optional field to indicate the active contract
  @IsOptional()
  @IsInt()
  contractId?: number | null;
}
export class signupUserDTO {
  email: string;
  password?: string;
  username: string;
  staff: {
    StaffName: string;
    AgentName: string;
    StaffCategory: string;
    Department: string;
    PostUnit: string;
    ManagerName: string;
    ManagerTitle: string;
    ManagerEmail: string;
    ContractStartDate: string;
    ContractEndDate: string;
    AnnualLeave: number;
  };
  staffId: number | null;
}

export class GoogleAuthDto {
  id: string; // Google ID
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}
