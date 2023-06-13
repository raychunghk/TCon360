import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserCreateOrConnectWithoutPostsInput } from './UserCreateOrConnectWithoutPostsInput';
import { UserCreateWithoutPostsInput } from './UserCreateWithoutPostsInput';
import { UserWhereUniqueInput } from './UserWhereUniqueInput';

@TypeGraphQL.InputType('UserCreateNestedOneWithoutPostsInput')
export class UserCreateNestedOneWithoutPostsInput {
  @TypeGraphQL.Field((_type) => UserCreateWithoutPostsInput, {
    nullable: true,
  })
  create?: UserCreateWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => UserCreateOrConnectWithoutPostsInput, {
    nullable: true,
  })
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => UserWhereUniqueInput, {
    nullable: true,
  })
  connect?: UserWhereUniqueInput | undefined;
}
