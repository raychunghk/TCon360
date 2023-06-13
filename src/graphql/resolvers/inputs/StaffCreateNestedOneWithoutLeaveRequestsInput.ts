import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffCreateOrConnectWithoutLeaveRequestsInput } from './StaffCreateOrConnectWithoutLeaveRequestsInput';
import { StaffCreateWithoutLeaveRequestsInput } from './StaffCreateWithoutLeaveRequestsInput';
import { StaffWhereUniqueInput } from './StaffWhereUniqueInput';

@TypeGraphQL.InputType('StaffCreateNestedOneWithoutLeaveRequestsInput')
export class StaffCreateNestedOneWithoutLeaveRequestsInput {
  @TypeGraphQL.Field((_type) => StaffCreateWithoutLeaveRequestsInput, {
    nullable: true,
  })
  create?: StaffCreateWithoutLeaveRequestsInput | undefined;

  @TypeGraphQL.Field((_type) => StaffCreateOrConnectWithoutLeaveRequestsInput, {
    nullable: true,
  })
  connectOrCreate?: StaffCreateOrConnectWithoutLeaveRequestsInput | undefined;

  @TypeGraphQL.Field((_type) => StaffWhereUniqueInput, {
    nullable: true,
  })
  connect?: StaffWhereUniqueInput | undefined;
}
