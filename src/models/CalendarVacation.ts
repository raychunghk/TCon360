import { Field, ObjectType, ID, Int } from 'type-graphql';
import { LeaveRequest } from './LeaveRequest';

@ObjectType()
export class CalendarVacation {
  @Field((_type) => ID)
  VacationDate: Date;

  @Field()
  ChargeableDay: number;

  @Field((_type) => LeaveRequest)
  leaveRequest: LeaveRequest;

  @Field((_type) => Int)
  LeaveRequestId: number;

  // skip overwrite 👇
}
