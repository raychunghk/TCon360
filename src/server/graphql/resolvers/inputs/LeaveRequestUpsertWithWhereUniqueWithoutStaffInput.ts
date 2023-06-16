import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestCreateWithoutStaffInput } from '../inputs/LeaveRequestCreateWithoutStaffInput';
import { LeaveRequestUpdateWithoutStaffInput } from '../inputs/LeaveRequestUpdateWithoutStaffInput';
import { LeaveRequestWhereUniqueInput } from '../inputs/LeaveRequestWhereUniqueInput';

@TypeGraphQL.InputType('LeaveRequestUpsertWithWhereUniqueWithoutStaffInput', {
  description: "",
})
export class LeaveRequestUpsertWithWhereUniqueWithoutStaffInput {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereUniqueInput, {
    nullable: false,
  })
  where!: LeaveRequestWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LeaveRequestUpdateWithoutStaffInput, {
    nullable: false,
  })
  update!: LeaveRequestUpdateWithoutStaffInput;

  @TypeGraphQL.Field((_type) => LeaveRequestCreateWithoutStaffInput, {
    nullable: false,
  })
  create!: LeaveRequestCreateWithoutStaffInput;
}
