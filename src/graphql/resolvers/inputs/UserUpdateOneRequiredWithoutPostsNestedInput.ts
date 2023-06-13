import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserCreateOrConnectWithoutPostsInput } from './UserCreateOrConnectWithoutPostsInput';
import { UserCreateWithoutPostsInput } from './UserCreateWithoutPostsInput';
import { UserUpdateWithoutPostsInput } from './UserUpdateWithoutPostsInput';
import { UserUpsertWithoutPostsInput } from './UserUpsertWithoutPostsInput';
import { UserWhereUniqueInput } from './UserWhereUniqueInput';

@TypeGraphQL.InputType('UserUpdateOneRequiredWithoutPostsNestedInput')
export class UserUpdateOneRequiredWithoutPostsNestedInput {
  @TypeGraphQL.Field((_type) => UserCreateWithoutPostsInput, {
    nullable: true,
  })
  create?: UserCreateWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => UserCreateOrConnectWithoutPostsInput, {
    nullable: true,
  })
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpsertWithoutPostsInput, {
    nullable: true,
  })
  upsert?: UserUpsertWithoutPostsInput | undefined;

  @TypeGraphQL.Field((_type) => UserWhereUniqueInput, {
    nullable: true,
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpdateWithoutPostsInput, {
    nullable: true,
  })
  update?: UserUpdateWithoutPostsInput | undefined;
}
