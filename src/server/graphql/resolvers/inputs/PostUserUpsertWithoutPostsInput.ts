import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserCreateWithoutPostsInput } from '../inputs/PostUserCreateWithoutPostsInput';
import { PostUserUpdateWithoutPostsInput } from '../inputs/PostUserUpdateWithoutPostsInput';

@TypeGraphQL.InputType('PostUserUpsertWithoutPostsInput', {
 description:"",
})
export class PostUserUpsertWithoutPostsInput {
  @TypeGraphQL.Field((_type) => PostUserUpdateWithoutPostsInput, {
    nullable: false,
  })
  update!: PostUserUpdateWithoutPostsInput;

  @TypeGraphQL.Field((_type) => PostUserCreateWithoutPostsInput, {
    nullable: false,
  })
  create!: PostUserCreateWithoutPostsInput;
}
