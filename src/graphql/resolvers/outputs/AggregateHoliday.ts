import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { HolidayCountAggregate } from './HolidayCountAggregate';
import { HolidayMaxAggregate } from './HolidayMaxAggregate';
import { HolidayMinAggregate } from './HolidayMinAggregate';

@TypeGraphQL.ObjectType('AggregateHoliday')
export class AggregateHoliday {
  @TypeGraphQL.Field((_type) => HolidayCountAggregate, {
    nullable: true,
  })
  _count!: HolidayCountAggregate | null;

  @TypeGraphQL.Field((_type) => HolidayMinAggregate, {
    nullable: true,
  })
  _min!: HolidayMinAggregate | null;

  @TypeGraphQL.Field((_type) => HolidayMaxAggregate, {
    nullable: true,
  })
  _max!: HolidayMaxAggregate | null;
}
