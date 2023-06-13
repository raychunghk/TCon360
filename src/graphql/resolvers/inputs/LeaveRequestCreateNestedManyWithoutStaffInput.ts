import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestCreateOrConnectWithoutStaffInput } from './LeaveRequestCreateOrConnectWithoutStaffInput';
import { LeaveRequestCreateWithoutStaffInput } from './LeaveRequestCreateWithoutStaffInput';
import { LeaveRequestWhereUniqueInput } from './LeaveRequestWhereUniqueInput';

@TypeGraphQL.InputType('LeaveRequestCreateNestedManyWithoutStaffInput')
export class LeaveRequestCreateNestedManyWithoutStaffInput {
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

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereUniqueInput], {
    nullable: true,
  })
  connect?: LeaveRequestWhereUniqueInput[] | undefined;
}
