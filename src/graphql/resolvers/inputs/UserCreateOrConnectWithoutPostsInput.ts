import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserCreateWithoutPostsInput } from './UserCreateWithoutPostsInput';
import { UserWhereUniqueInput } from './UserWhereUniqueInput';

@TypeGraphQL.InputType('UserCreateOrConnectWithoutPostsInput')
export class UserCreateOrConnectWithoutPostsInput {
  @TypeGraphQL.Field((_type) => UserWhereUniqueInput, {
    nullable: false,
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field((_type) => UserCreateWithoutPostsInput, {
    nullable: false,
  })
  create!: UserCreateWithoutPostsInput;
}
