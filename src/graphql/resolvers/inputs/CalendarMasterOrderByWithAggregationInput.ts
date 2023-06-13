import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarMasterAvgOrderByAggregateInput } from './CalendarMasterAvgOrderByAggregateInput';
import { CalendarMasterCountOrderByAggregateInput } from './CalendarMasterCountOrderByAggregateInput';
import { CalendarMasterMaxOrderByAggregateInput } from './CalendarMasterMaxOrderByAggregateInput';
import { CalendarMasterMinOrderByAggregateInput } from './CalendarMasterMinOrderByAggregateInput';
import { CalendarMasterSumOrderByAggregateInput } from './CalendarMasterSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('CalendarMasterOrderByWithAggregationInput')
export class CalendarMasterOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  CalendarDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  WeekDayName?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  Year?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  Month?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => CalendarMasterCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: CalendarMasterCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CalendarMasterAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: CalendarMasterAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CalendarMasterMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: CalendarMasterMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CalendarMasterMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: CalendarMasterMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CalendarMasterSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: CalendarMasterSumOrderByAggregateInput | undefined;
}
