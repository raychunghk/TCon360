import { Staff } from './Staff';
import { Field, ObjectType, Int, Float } from 'type-graphql';
import { staffFiles } from './staffFiles';

@ObjectType()
export class LeaveRequest {
  @Field((_type) => Int)
  id: number;

  @Field()
  leavePeriodStart: Date;

  @Field({ nullable: true })
  AMPMStart?: string;

  @Field()
  leavePeriodEnd: Date;

  @Field({ nullable: true })
  AMPMEnd?: string;

  @Field((_type) => Float)
  leaveDays: number;

  @Field()
  dateOfReturn: Date;

  @Field()
  staffSignDate: Date;

  @Field((_type) => Int)
  fileId: number;

  @Field((_type) => staffFiles)
  staffFile: staffFiles;

  @Field((_type) => Int)
  staffId: number;

  @Field((_type) => Staff)
  staff: Staff;

  // skip overwrite 👇
}
