import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarAvgAggregate } from '../outputs/TimeSheetCalendarAvgAggregate';
import { TimeSheetCalendarCountAggregate } from '../outputs/TimeSheetCalendarCountAggregate';
import { TimeSheetCalendarMaxAggregate } from '../outputs/TimeSheetCalendarMaxAggregate';
import { TimeSheetCalendarMinAggregate } from '../outputs/TimeSheetCalendarMinAggregate';
import { TimeSheetCalendarSumAggregate } from '../outputs/TimeSheetCalendarSumAggregate';

@TypeGraphQL.ObjectType('AggregateTimeSheetCalendar', {
  description:"",
})
export class AggregateTimeSheetCalendar {
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
