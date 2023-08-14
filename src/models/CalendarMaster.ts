import { Field, ObjectType, ID, Int } from 'type-graphql';
import { PublicHoliday } from './PublicHoliday';
import { CalendarVacation } from './CalendarVacation';

@ObjectType()
export class CalendarMaster {
  @Field((_type) => ID)
  CalendarDate: Date;

  @Field({ nullable: true })
  WeekDayName?: string;

  @Field((_type) => Int)
  Year: number;

  @Field((_type) => Int)
  Month: number;

  // skip overwrite 👇
}
