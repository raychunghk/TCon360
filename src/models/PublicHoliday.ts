import { Field, ObjectType, ID } from 'type-graphql';
import { CalendarMaster } from './CalendarMaster';

@ObjectType()
export class PublicHoliday {
  @Field((_type) => ID)
  StartDate: Date;

  @Field()
  EndDate: Date;

  @Field({ nullable: true })
  Summary?: string;

  // skip overwrite 👇
}
