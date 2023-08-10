import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Session {
  @Field((_type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  expires: Date;

  @Field()
  sessionToken: string;

  @Field()
  accessToken: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
