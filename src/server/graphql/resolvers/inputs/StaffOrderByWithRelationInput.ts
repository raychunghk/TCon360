import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestOrderByRelationAggregateInput } from '../inputs/LeaveRequestOrderByRelationAggregateInput';
import { UserOrderByWithRelationInput } from '../inputs/UserOrderByWithRelationInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('StaffOrderByWithRelationInput', {
  description: "",
})
export class StaffOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  StaffName?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  AgentName?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  StaffCategory?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  Department?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  PostUnit?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ManagerName?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ManagerTitle?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ManagerEmail?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  userId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => UserOrderByWithRelationInput, {
    nullable: true,
  })
  user?: UserOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestOrderByRelationAggregateInput, {
    nullable: true,
  })
  leaveRequests?: LeaveRequestOrderByRelationAggregateInput | undefined;
}
