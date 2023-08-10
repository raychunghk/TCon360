import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Account {
  @Field((_type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  providerType: string;

  @Field()
  providerId: string;

  @Field()
  providerAccountId: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  accessTokenExpires?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((_type) => User)
  user: User;

  // skip overwrite 👇
}
