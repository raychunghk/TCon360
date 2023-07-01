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

  @Field((_type) => Int)
  TSCalendarID: number;

  @Field({ nullable: true })
  TimeSheetFileName?: string;

  @Field()
  TotalChargeableDay: number;

  @Field()
  TotalChargeableHour: number;

  @Field()
  TotalOTHour: number;

  @Field((_type) => [TimeSheetCalendar])
  calendar: TimeSheetCalendar[];

  // skip overwrite 👇
}
