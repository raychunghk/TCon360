import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class UserVacation {
  @Field((_type) => ID)
  VacationDate: Date;

  @Field()
  ChargeableDay: number;

  // skip overwrite 👇
}
