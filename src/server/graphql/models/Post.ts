import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { PostUser } from '../models/PostUser';

@TypeGraphQL.ObjectType('Post', {
 description:"",
})
export class Post {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  title!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  content?: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
  published!: boolean;

  author?: PostUser;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  authorId!: number;
}
