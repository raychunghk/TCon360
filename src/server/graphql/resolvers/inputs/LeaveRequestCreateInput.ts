import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffCreateNestedOneWithoutLeaveRequestsInput } from '../inputs/StaffCreateNestedOneWithoutLeaveRequestsInput';

@TypeGraphQL.InputType('LeaveRequestCreateInput', {
 description:"",
})
export class LeaveRequestCreateInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodStart!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMStart?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodEnd!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMEnd?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  leaveDays!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  dateOfReturn!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  staffSignDate!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  requestFormFileName?: string | undefined;

  @TypeGraphQL.Field((_type) => StaffCreateNestedOneWithoutLeaveRequestsInput, {
    nullable: false,
  })
  staff!: StaffCreateNestedOneWithoutLeaveRequestsInput;
}
