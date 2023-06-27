import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarMasterAvgAggregate } from '../outputs/CalendarMasterAvgAggregate';
import { CalendarMasterCountAggregate } from '../outputs/CalendarMasterCountAggregate';
import { CalendarMasterMaxAggregate } from '../outputs/CalendarMasterMaxAggregate';
import { CalendarMasterMinAggregate } from '../outputs/CalendarMasterMinAggregate';
import { CalendarMasterSumAggregate } from '../outputs/CalendarMasterSumAggregate';

@TypeGraphQL.ObjectType('CalendarMasterGroupBy', {
  description:"",
})
export class CalendarMasterGroupBy {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  CalendarDate!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  WeekDayName!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  Year!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  Month!: number;

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
