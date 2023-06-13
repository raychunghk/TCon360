import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestCreateWithoutStaffInput } from './LeaveRequestCreateWithoutStaffInput';
import { LeaveRequestUpdateWithoutStaffInput } from './LeaveRequestUpdateWithoutStaffInput';
import { LeaveRequestWhereUniqueInput } from './LeaveRequestWhereUniqueInput';

@TypeGraphQL.InputType('LeaveRequestUpsertWithWhereUniqueWithoutStaffInput')
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
