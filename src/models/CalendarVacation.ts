import { Field, ObjectType, ID, Int } from 'type-graphql';
import { LeaveRequest } from './LeaveRequest';
import { CalendarMaster } from './CalendarMaster';


@ObjectType()
export class CalendarVacation {
  @Field((_type) => Int)
  id: number;

  @Field()
  VacationDate: Date;

  @Field()
  ChargeableDay: number;

  @Field((_type) => Int)
  LeaveRequestId: number;

  @Field((_type) => LeaveRequest)
  leaveRequest: LeaveRequest;

  // skip overwrite 👇
}
