import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserCreateWithoutPostsInput } from '../inputs/PostUserCreateWithoutPostsInput';
import { PostUserWhereUniqueInput } from '../inputs/PostUserWhereUniqueInput';

@TypeGraphQL.InputType('PostUserCreateOrConnectWithoutPostsInput', {
  description: '',
})
export class PostUserCreateOrConnectWithoutPostsInput {
  @TypeGraphQL.Field((_type) => PostUserWhereUniqueInput, {
    nullable: false,
  })
  where!: PostUserWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PostUserCreateWithoutPostsInput, {
    nullable: false,
  })
  create!: PostUserCreateWithoutPostsInput;
}
