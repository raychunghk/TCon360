import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class VerificationRequest {
  @Field((_type) => ID)
  id: string;

  @Field()
  identifier: string;

  @Field()
  token: string;

  @Field()
  expires: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // skip overwrite 👇
}
