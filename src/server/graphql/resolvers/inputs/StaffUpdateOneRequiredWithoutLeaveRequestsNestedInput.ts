import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffCreateOrConnectWithoutLeaveRequestsInput } from '../inputs/StaffCreateOrConnectWithoutLeaveRequestsInput';
import { StaffCreateWithoutLeaveRequestsInput } from '../inputs/StaffCreateWithoutLeaveRequestsInput';
import { StaffUpdateWithoutLeaveRequestsInput } from '../inputs/StaffUpdateWithoutLeaveRequestsInput';
import { StaffUpsertWithoutLeaveRequestsInput } from '../inputs/StaffUpsertWithoutLeaveRequestsInput';
import { StaffWhereUniqueInput } from '../inputs/StaffWhereUniqueInput';

@TypeGraphQL.InputType(
  'StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput',
  {
    description: "",
  },
)
export class StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput {
  @TypeGraphQL.Field((_type) => StaffCreateWithoutLeaveRequestsInput, {
    nullable: true,
  })
  create?: StaffCreateWithoutLeaveRequestsInput | undefined;

  @TypeGraphQL.Field((_type) => StaffCreateOrConnectWithoutLeaveRequestsInput, {
    nullable: true,
  })
  connectOrCreate?: StaffCreateOrConnectWithoutLeaveRequestsInput | undefined;

  @TypeGraphQL.Field((_type) => StaffUpsertWithoutLeaveRequestsInput, {
    nullable: true,
  })
  upsert?: StaffUpsertWithoutLeaveRequestsInput | undefined;

  @TypeGraphQL.Field((_type) => StaffWhereUniqueInput, {
    nullable: true,
  })
  connect?: StaffWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => StaffUpdateWithoutLeaveRequestsInput, {
    nullable: true,
  })
  update?: StaffUpdateWithoutLeaveRequestsInput | undefined;
}
