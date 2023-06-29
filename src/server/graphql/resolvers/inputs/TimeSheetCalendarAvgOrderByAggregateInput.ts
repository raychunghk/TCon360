import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('TimeSheetCalendarAvgOrderByAggregateInput', {
  description:"",
})
export class TimeSheetCalendarAvgOrderByAggregateInput {
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
  Training?: 'asc' | 'desc' | undefined;

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
}
