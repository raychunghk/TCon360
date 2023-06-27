import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffAvgOrderByAggregateInput } from '../inputs/StaffAvgOrderByAggregateInput';
import { StaffCountOrderByAggregateInput } from '../inputs/StaffCountOrderByAggregateInput';
import { StaffMaxOrderByAggregateInput } from '../inputs/StaffMaxOrderByAggregateInput';
import { StaffMinOrderByAggregateInput } from '../inputs/StaffMinOrderByAggregateInput';
import { StaffSumOrderByAggregateInput } from '../inputs/StaffSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('StaffOrderByWithAggregationInput', {
  description:"",
})
export class StaffOrderByWithAggregationInput {
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

  @TypeGraphQL.Field((_type) => StaffCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: StaffCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => StaffAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: StaffAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => StaffMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: StaffMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => StaffMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: StaffMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => StaffSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: StaffSumOrderByAggregateInput | undefined;
}
