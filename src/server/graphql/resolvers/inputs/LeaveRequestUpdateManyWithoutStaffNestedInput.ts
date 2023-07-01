import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestCreateOrConnectWithoutStaffInput } from '../inputs/LeaveRequestCreateOrConnectWithoutStaffInput';
import { LeaveRequestCreateWithoutStaffInput } from '../inputs/LeaveRequestCreateWithoutStaffInput';
import { LeaveRequestScalarWhereInput } from '../inputs/LeaveRequestScalarWhereInput';
import { LeaveRequestUpdateManyWithWhereWithoutStaffInput } from '../inputs/LeaveRequestUpdateManyWithWhereWithoutStaffInput';
import { LeaveRequestUpdateWithWhereUniqueWithoutStaffInput } from '../inputs/LeaveRequestUpdateWithWhereUniqueWithoutStaffInput';
import { LeaveRequestUpsertWithWhereUniqueWithoutStaffInput } from '../inputs/LeaveRequestUpsertWithWhereUniqueWithoutStaffInput';
import { LeaveRequestWhereUniqueInput } from '../inputs/LeaveRequestWhereUniqueInput';

@TypeGraphQL.InputType('LeaveRequestUpdateManyWithoutStaffNestedInput', {
  description: '',
})
export class LeaveRequestUpdateManyWithoutStaffNestedInput {
  @TypeGraphQL.Field((_type) => [LeaveRequestCreateWithoutStaffInput], {
    nullable: true,
  })
  create?: LeaveRequestCreateWithoutStaffInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LeaveRequestCreateOrConnectWithoutStaffInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?: LeaveRequestCreateOrConnectWithoutStaffInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LeaveRequestUpsertWithWhereUniqueWithoutStaffInput],
    {
      nullable: true,
    },
  )
  upsert?: LeaveRequestUpsertWithWhereUniqueWithoutStaffInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereUniqueInput], {
    nullable: true,
  })
  set?: LeaveRequestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: LeaveRequestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereUniqueInput], {
    nullable: true,
  })
  delete?: LeaveRequestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereUniqueInput], {
    nullable: true,
  })
  connect?: LeaveRequestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LeaveRequestUpdateWithWhereUniqueWithoutStaffInput],
    {
      nullable: true,
    },
  )
  update?: LeaveRequestUpdateWithWhereUniqueWithoutStaffInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LeaveRequestUpdateManyWithWhereWithoutStaffInput],
    {
      nullable: true,
    },
  )
  updateMany?: LeaveRequestUpdateManyWithWhereWithoutStaffInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: LeaveRequestScalarWhereInput[] | undefined;
}
