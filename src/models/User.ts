import { Field, ObjectType, Int } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
export class User {
  @Field((_type) => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  username?: string;

  @Field()
  password: string;

  // skip overwrite 👇
}
