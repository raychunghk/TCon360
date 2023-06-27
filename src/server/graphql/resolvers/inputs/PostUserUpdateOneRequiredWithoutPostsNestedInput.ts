import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserCreateOrConnectWithoutPostsInput } from '../inputs/PostUserCreateOrConnectWithoutPostsInput';
import { PostUserCreateWithoutPostsInput } from '../inputs/PostUserCreateWithoutPostsInput';
import { PostUserUpdateWithoutPostsInput } from '../inputs/PostUserUpdateWithoutPostsInput';
import { PostUserUpsertWithoutPostsInput } from '../inputs/PostUserUpsertWithoutPostsInput';
import { PostUserWhereUniqueInput } from '../inputs/PostUserWhereUniqueInput';

@TypeGraphQL.InputType('PostUserUpdateOneRequiredWithoutPostsNestedInput', {
  description:"",
})
export class PostUserUpdateOneRequiredWithoutPostsNestedInput {
  @TypeGraphQL.Field((_type) => PostUserCreateWithoutPostsInput, {
    nullable: true,
  })
  create?: PostUserCreateWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserCreateOrConnectWithoutPostsInput, {
    nullable: true,
  })
  connectOrCreate?: PostUserCreateOrConnectWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserUpsertWithoutPostsInput, {
    nullable: true,
  })
  upsert?: PostUserUpsertWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserWhereUniqueInput, {
    nullable: true,
  })
  connect?: PostUserWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserUpdateWithoutPostsInput, {
    nullable: true,
  })
  update?: PostUserUpdateWithoutPostsInput | undefined;
}
