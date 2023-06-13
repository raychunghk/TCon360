import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarMasterAvgAggregate } from './CalendarMasterAvgAggregate';
import { CalendarMasterCountAggregate } from './CalendarMasterCountAggregate';
import { CalendarMasterMaxAggregate } from './CalendarMasterMaxAggregate';
import { CalendarMasterMinAggregate } from './CalendarMasterMinAggregate';
import { CalendarMasterSumAggregate } from './CalendarMasterSumAggregate';

@TypeGraphQL.ObjectType('AggregateCalendarMaster')
export class AggregateCalendarMaster {
  @TypeGraphQL.Field((_type) => CalendarMasterCountAggregate, {
    nullable: true,
  })
  _count!: CalendarMasterCountAggregate | null;

  @TypeGraphQL.Field((_type) => CalendarMasterAvgAggregate, {
    nullable: true,
  })
  _avg!: CalendarMasterAvgAggregate | null;

  @TypeGraphQL.Field((_type) => CalendarMasterSumAggregate, {
    nullable: true,
  })
  _sum!: CalendarMasterSumAggregate | null;

  @TypeGraphQL.Field((_type) => CalendarMasterMinAggregate, {
    nullable: true,
  })
  _min!: CalendarMasterMinAggregate | null;

  @TypeGraphQL.Field((_type) => CalendarMasterMaxAggregate, {
    nullable: true,
  })
  _max!: CalendarMasterMaxAggregate | null;
}
