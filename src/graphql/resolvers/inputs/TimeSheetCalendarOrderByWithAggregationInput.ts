import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarAvgOrderByAggregateInput } from './TimeSheetCalendarAvgOrderByAggregateInput';
import { TimeSheetCalendarCountOrderByAggregateInput } from './TimeSheetCalendarCountOrderByAggregateInput';
import { TimeSheetCalendarMaxOrderByAggregateInput } from './TimeSheetCalendarMaxOrderByAggregateInput';
import { TimeSheetCalendarMinOrderByAggregateInput } from './TimeSheetCalendarMinOrderByAggregateInput';
import { TimeSheetCalendarSumOrderByAggregateInput } from './TimeSheetCalendarSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('TimeSheetCalendarOrderByWithAggregationInput')
export class TimeSheetCalendarOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  DayID?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  CalendarDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  TimeSheetID?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ChargeableDay?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ChargeableHour?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  Traing?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  Vacation?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  PublicHoliday?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  WeekEnd?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  Others?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: TimeSheetCalendarCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: TimeSheetCalendarAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: TimeSheetCalendarMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: TimeSheetCalendarMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: TimeSheetCalendarSumOrderByAggregateInput | undefined;
}
