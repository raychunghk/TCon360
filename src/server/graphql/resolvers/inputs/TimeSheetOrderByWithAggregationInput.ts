import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetAvgOrderByAggregateInput } from '../inputs/TimeSheetAvgOrderByAggregateInput';
import { TimeSheetCountOrderByAggregateInput } from '../inputs/TimeSheetCountOrderByAggregateInput';
import { TimeSheetMaxOrderByAggregateInput } from '../inputs/TimeSheetMaxOrderByAggregateInput';
import { TimeSheetMinOrderByAggregateInput } from '../inputs/TimeSheetMinOrderByAggregateInput';
import { TimeSheetSumOrderByAggregateInput } from '../inputs/TimeSheetSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('TimeSheetOrderByWithAggregationInput', {
 description:"",
})
export class TimeSheetOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  StartDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  EndDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  TSCalendarID?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  TimeSheetFileName?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  TotalChargeableDay?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  TotalChargeableHour?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  TotalOTHour?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: TimeSheetCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: TimeSheetAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: TimeSheetMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: TimeSheetMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: TimeSheetSumOrderByAggregateInput | undefined;
}
