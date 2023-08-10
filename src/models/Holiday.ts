import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Holiday {
  @Field((_type) => ID)
  StartDate: Date;

  @Field()
  EndDate: Date;

  @Field({ nullable: true })
  Summary?: string;

  // skip overwrite 👇
}
