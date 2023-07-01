import { Field, ObjectType, Int } from 'type-graphql';
import { TimeSheet } from './TimeSheet';

@ObjectType()
export class TimeSheetCalendar {
  @Field((_type) => Int)
  id: number;

  @Field((_type) => Int)
  DayID: number;

  @Field()
  CalendarDate: Date;

  @Field((_type) => Int)
  TimeSheetID: number;

  @Field()
  ChargeableDay: number;

  @Field()
  ChargeableHour: number;

  @Field()
  Training: number;

  @Field()
  Vacation: number;

  @Field()
  PublicHoliday: number;

  @Field()
  WeekEnd: number;

  @Field()
  Others: number;

  @Field((_type) => TimeSheet)
  timesheet: TimeSheet;

  // skip overwrite 👇
}
