import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestScalarWhereInput } from './LeaveRequestScalarWhereInput';
import { LeaveRequestUpdateManyMutationInput } from './LeaveRequestUpdateManyMutationInput';

@TypeGraphQL.InputType('LeaveRequestUpdateManyWithWhereWithoutStaffInput')
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
