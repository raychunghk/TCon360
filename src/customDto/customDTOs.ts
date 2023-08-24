export class UpdateUserDto {
  name?: string;
  email?: string;
  roleId?: number;
  userStatus?: string;
}

import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateContractDto {
  @IsDateString()
  ContractStartDate: Date;

  @IsDateString()
  ContractEndDate: Date;

  @IsInt()
  AnnualLeave: number;
  @IsInt()
  id: number;
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
/*


{
    "username": "raychung",
    "name": "Ray Chung1",
    "email": "mannchung@gmail.com",
    "roleName": "admin",
    "userStatus": "active",
    "userId": "cllkp45s90001plyf19ta6g6e"
}*;*/
