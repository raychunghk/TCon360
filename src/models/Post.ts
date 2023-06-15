import { Field, ObjectType, Int } from 'type-graphql';
import { User } from './User';
import { PostUser } from './PostUser';

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

  @Field((_type) => PostUser)
  author: PostUser;

  @Field((_type) => Int)
  authorId: number;

  // skip overwrite 👇
}
