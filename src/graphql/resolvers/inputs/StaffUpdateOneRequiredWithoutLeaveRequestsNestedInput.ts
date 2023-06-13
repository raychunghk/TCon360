import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffCreateOrConnectWithoutLeaveRequestsInput } from './StaffCreateOrConnectWithoutLeaveRequestsInput';
import { StaffCreateWithoutLeaveRequestsInput } from './StaffCreateWithoutLeaveRequestsInput';
import { StaffUpdateWithoutLeaveRequestsInput } from './StaffUpdateWithoutLeaveRequestsInput';
import { StaffUpsertWithoutLeaveRequestsInput } from './StaffUpsertWithoutLeaveRequestsInput';
import { StaffWhereUniqueInput } from './StaffWhereUniqueInput';

@TypeGraphQL.InputType(
  'StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput',
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
