import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserCreateOrConnectWithoutPostsInput } from '../inputs/PostUserCreateOrConnectWithoutPostsInput';
import { PostUserCreateWithoutPostsInput } from '../inputs/PostUserCreateWithoutPostsInput';
import { PostUserWhereUniqueInput } from '../inputs/PostUserWhereUniqueInput';

@TypeGraphQL.InputType('PostUserCreateNestedOneWithoutPostsInput', {
 description:"",
})
export class PostUserCreateNestedOneWithoutPostsInput {
  @TypeGraphQL.Field((_type) => PostUserCreateWithoutPostsInput, {
    nullable: true,
  })
  create?: PostUserCreateWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserCreateOrConnectWithoutPostsInput, {
    nullable: true,
  })
  connectOrCreate?: PostUserCreateOrConnectWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserWhereUniqueInput, {
    nullable: true,
  })
  connect?: PostUserWhereUniqueInput | undefined;
}
