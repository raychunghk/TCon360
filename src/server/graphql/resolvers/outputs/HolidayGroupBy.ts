import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { HolidayCountAggregate } from '../outputs/HolidayCountAggregate';
import { HolidayMaxAggregate } from '../outputs/HolidayMaxAggregate';
import { HolidayMinAggregate } from '../outputs/HolidayMinAggregate';

@TypeGraphQL.ObjectType('HolidayGroupBy', {})
export class HolidayGroupBy {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  StartDate!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  EndDate!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  Summary!: string | null;

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
