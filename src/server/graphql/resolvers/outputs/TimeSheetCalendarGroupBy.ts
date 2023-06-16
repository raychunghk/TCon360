import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarAvgAggregate } from '../outputs/TimeSheetCalendarAvgAggregate';
import { TimeSheetCalendarCountAggregate } from '../outputs/TimeSheetCalendarCountAggregate';
import { TimeSheetCalendarMaxAggregate } from '../outputs/TimeSheetCalendarMaxAggregate';
import { TimeSheetCalendarMinAggregate } from '../outputs/TimeSheetCalendarMinAggregate';
import { TimeSheetCalendarSumAggregate } from '../outputs/TimeSheetCalendarSumAggregate';

@TypeGraphQL.ObjectType('TimeSheetCalendarGroupBy', {
  description: "",
})
export class TimeSheetCalendarGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  DayID!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  CalendarDate!: Date;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  TimeSheetID!: number;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableDay!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  Traing!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  Vacation!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  PublicHoliday!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  WeekEnd!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  Others!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarCountAggregate, {
    nullable: true,
  })
  _count!: TimeSheetCalendarCountAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarAvgAggregate, {
    nullable: true,
  })
  _avg!: TimeSheetCalendarAvgAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarSumAggregate, {
    nullable: true,
  })
  _sum!: TimeSheetCalendarSumAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarMinAggregate, {
    nullable: true,
  })
  _min!: TimeSheetCalendarMinAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarMaxAggregate, {
    nullable: true,
  })
  _max!: TimeSheetCalendarMaxAggregate | null;
}
