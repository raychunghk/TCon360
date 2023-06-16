import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserCreateNestedOneWithoutStaffInput } from '../inputs/UserCreateNestedOneWithoutStaffInput';

@TypeGraphQL.InputType('StaffCreateWithoutLeaveRequestsInput', {
  description: "",
})
export class StaffCreateWithoutLeaveRequestsInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  StaffName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  AgentName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  StaffCategory!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  Department!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  PostUnit!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  ManagerName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  ManagerTitle!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  ManagerEmail!: string;

  @TypeGraphQL.Field((_type) => UserCreateNestedOneWithoutStaffInput, {
    nullable: false,
  })
  user!: UserCreateNestedOneWithoutStaffInput;
}
