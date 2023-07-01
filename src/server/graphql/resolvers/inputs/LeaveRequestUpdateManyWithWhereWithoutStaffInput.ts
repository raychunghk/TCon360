import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestScalarWhereInput } from '../inputs/LeaveRequestScalarWhereInput';
import { LeaveRequestUpdateManyMutationInput } from '../inputs/LeaveRequestUpdateManyMutationInput';

@TypeGraphQL.InputType('LeaveRequestUpdateManyWithWhereWithoutStaffInput', {
  description: '',
})
export class LeaveRequestUpdateManyWithWhereWithoutStaffInput {
  @TypeGraphQL.Field((_type) => LeaveRequestScalarWhereInput, {
    nullable: false,
  })
  where!: LeaveRequestScalarWhereInput;

  @TypeGraphQL.Field((_type) => LeaveRequestUpdateManyMutationInput, {
    nullable: false,
  })
  data!: LeaveRequestUpdateManyMutationInput;
}
