import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { Post } from '../models/Post';
import { PostUserCount } from '../resolvers/outputs/PostUserCount';

@TypeGraphQL.ObjectType('PostUser', {
  description:"",
})
export class PostUser {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | null;

  posts?: Post[];

  @TypeGraphQL.Field((_type) => PostUserCount, {
    nullable: true,
  })
  _count?: PostUserCount | null;
}
