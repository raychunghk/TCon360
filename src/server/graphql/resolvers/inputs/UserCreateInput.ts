import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { AccountCreateNestedManyWithoutUserInput } from '../inputs/AccountCreateNestedManyWithoutUserInput';
import { SessionCreateNestedManyWithoutUserInput } from '../inputs/SessionCreateNestedManyWithoutUserInput';
import { StaffCreateNestedOneWithoutUserInput } from '../inputs/StaffCreateNestedOneWithoutUserInput';

@TypeGraphQL.InputType('UserCreateInput', {
  description:"",
})
export class UserCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  username?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  emailVerified?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  image?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => AccountCreateNestedManyWithoutUserInput, {
    nullable: true,
  })
  accounts?: AccountCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field((_type) => SessionCreateNestedManyWithoutUserInput, {
    nullable: true,
  })
  sessions?: SessionCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field((_type) => StaffCreateNestedOneWithoutUserInput, {
    nullable: true,
  })
  staff?: StaffCreateNestedOneWithoutUserInput | undefined;
}
