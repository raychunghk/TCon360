import { Field, ObjectType, Int } from 'type-graphql';
import { TimeSheetCalendar } from './TimeSheetCalendar';

@ObjectType()
export class TimeSheet {
  @Field((_type) => Int)
  id: number;

  @Field()
  StartDate: Date;

  @Field()
  EndDate: Date;

  @Field((_type) => [TimeSheetCalendar])
  calendar: TimeSheetCalendar[];

  @Field((_type) => Int)
  TSCalendarID: number;

  @Field()
  TotalChargeableDay: number;

  @Field()
  TotalChargeableHour: number;

  @Field()
  TotalOTHour: number;

  // skip overwrite 👇
}
