import { Staff } from './Staff';
import { Field, ObjectType, Int, Float } from 'type-graphql';
import { staffFiles } from './staffFiles';
import { CalendarVacation } from './CalendarVacation';

@ObjectType()
export class LeaveRequest {
  @Field((_type) => Int)
  id: number;

  @Field()
  leavePeriodStart: Date;

  @Field()
  AMPMStart: string;

  @Field({ nullable: true })
  leavePeriodEnd?: Date;

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

  @Field((_type) => Int)
  staffId: number;

  @Field((_type) => [CalendarVacation])
  calendarVacation: CalendarVacation[];

  @Field((_type) => Staff)
  staff: Staff;

  @Field((_type) => staffFiles)
  staffFile: staffFiles;

  @Field({ nullable: true })
  Title?: string;

  // skip overwrite 👇
}
