import { Field, ObjectType, Int } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
export class PostUser {
  @Field((_type) => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field((_type) => [Post])
  posts: Post[];

  // skip overwrite 👇
}
