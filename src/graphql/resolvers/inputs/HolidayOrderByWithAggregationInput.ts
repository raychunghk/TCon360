import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { HolidayCountOrderByAggregateInput } from './HolidayCountOrderByAggregateInput';
import { HolidayMaxOrderByAggregateInput } from './HolidayMaxOrderByAggregateInput';
import { HolidayMinOrderByAggregateInput } from './HolidayMinOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('HolidayOrderByWithAggregationInput')
export class HolidayOrderByWithAggregationInput {
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
  Summary?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => HolidayCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: HolidayCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => HolidayMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: HolidayMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => HolidayMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: HolidayMinOrderByAggregateInput | undefined;
}
