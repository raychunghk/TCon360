import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffCreateWithoutLeaveRequestsInput } from './StaffCreateWithoutLeaveRequestsInput';
import { StaffWhereUniqueInput } from './StaffWhereUniqueInput';

@TypeGraphQL.InputType('StaffCreateOrConnectWithoutLeaveRequestsInput')
export class StaffCreateOrConnectWithoutLeaveRequestsInput {
  @TypeGraphQL.Field((_type) => StaffWhereUniqueInput, {
    nullable: false,
  })
  where!: StaffWhereUniqueInput;

  @TypeGraphQL.Field((_type) => StaffCreateWithoutLeaveRequestsInput, {
    nullable: false,
  })
  create!: StaffCreateWithoutLeaveRequestsInput;
}
