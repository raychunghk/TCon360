import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export class CalendarWithHolidaysAndVacations {
  @Field((_type) => ID)
  CalendarDate: Date;

  @Field()
  CalendarDateStr: string;

  @Field({ nullable: true })
  WeekDayName?: string;

  @Field((_type) => Int)
  Year: number;

  @Field((_type) => Int)
  Month: number;

  @Field({ nullable: true })
  VacationChargable?: number;

  @Field({ nullable: true })
  PublicHolidayChargable?: number;

  @Field({ nullable: true })
  HolidaySummary?: string;

  @Field((_type) => Int)
  LeaveRequestId: number;

  // skip overwrite 👇
}
