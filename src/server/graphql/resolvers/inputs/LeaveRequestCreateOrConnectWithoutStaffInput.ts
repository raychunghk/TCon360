import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestCreateWithoutStaffInput } from '../inputs/LeaveRequestCreateWithoutStaffInput';
import { LeaveRequestWhereUniqueInput } from '../inputs/LeaveRequestWhereUniqueInput';

@TypeGraphQL.InputType('LeaveRequestCreateOrConnectWithoutStaffInput', {
 description:"",
})
export class LeaveRequestCreateOrConnectWithoutStaffInput {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereUniqueInput, {
    nullable: false,
  })
  where!: LeaveRequestWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LeaveRequestCreateWithoutStaffInput, {
    nullable: false,
  })
  create!: LeaveRequestCreateWithoutStaffInput;
}
