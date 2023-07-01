import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestAvgOrderByAggregateInput } from '../inputs/LeaveRequestAvgOrderByAggregateInput';
import { LeaveRequestCountOrderByAggregateInput } from '../inputs/LeaveRequestCountOrderByAggregateInput';
import { LeaveRequestMaxOrderByAggregateInput } from '../inputs/LeaveRequestMaxOrderByAggregateInput';
import { LeaveRequestMinOrderByAggregateInput } from '../inputs/LeaveRequestMinOrderByAggregateInput';
import { LeaveRequestSumOrderByAggregateInput } from '../inputs/LeaveRequestSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('LeaveRequestOrderByWithAggregationInput', {
  description: '',
})
export class LeaveRequestOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  leavePeriodStart?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  AMPMStart?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  leavePeriodEnd?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  AMPMEnd?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  leaveDays?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  dateOfReturn?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  staffSignDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  fileId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  staffId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: LeaveRequestCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: LeaveRequestAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: LeaveRequestMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: LeaveRequestMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: LeaveRequestSumOrderByAggregateInput | undefined;
}
