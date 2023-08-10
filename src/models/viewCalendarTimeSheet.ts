import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export class viewCalendarTimeSheet {
  @Field((_type) => ID)
  CalendarDate: Date;

  @Field({ nullable: true })
  CalendarDateStr?: string;

  @Field({ nullable: true })
  WeekDayName?: string;

  @Field((_type) => Int, { nullable: true })
  Year?: number;

  @Field((_type) => Int, { nullable: true })
  Month?: number;

  @Field({ nullable: true })
  VacationChargable?: number;

  @Field({ nullable: true })
  PublicHolidayChargable?: number;

  @Field({ nullable: true })
  HolidaySummary?: string;

  @Field((_type) => Int, { nullable: true })
  LeaveRequestId?: number;

  // skip overwrite 👇
}
