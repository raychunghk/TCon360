import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarMasterAvgOrderByAggregateInput } from '../inputs/CalendarMasterAvgOrderByAggregateInput';
import { CalendarMasterCountOrderByAggregateInput } from '../inputs/CalendarMasterCountOrderByAggregateInput';
import { CalendarMasterMaxOrderByAggregateInput } from '../inputs/CalendarMasterMaxOrderByAggregateInput';
import { CalendarMasterMinOrderByAggregateInput } from '../inputs/CalendarMasterMinOrderByAggregateInput';
import { CalendarMasterSumOrderByAggregateInput } from '../inputs/CalendarMasterSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('CalendarMasterOrderByWithAggregationInput', {
  description: "",
})
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
