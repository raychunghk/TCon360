import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeWithAggregatesFilter } from './DateTimeWithAggregatesFilter';
import { DecimalWithAggregatesFilter } from './DecimalWithAggregatesFilter';
import { IntWithAggregatesFilter } from './IntWithAggregatesFilter';

@TypeGraphQL.InputType('TimeSheetCalendarScalarWhereWithAggregatesInput')
export class TimeSheetCalendarScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  AND?: TimeSheetCalendarScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  OR?: TimeSheetCalendarScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  NOT?: TimeSheetCalendarScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  DayID?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  CalendarDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  TimeSheetID?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  ChargeableDay?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  ChargeableHour?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  Traing?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  Vacation?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  PublicHoliday?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  WeekEnd?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  Others?: DecimalWithAggregatesFilter | undefined;
}
