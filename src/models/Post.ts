import { Field, ObjectType, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Post {
  @Field((_type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  published: boolean;

  @Field((_type) => User)
  author: User;

  @Field((_type) => Int)
  authorId: number;

  // skip overwrite 👇
}
