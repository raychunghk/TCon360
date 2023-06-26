import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetAvgAggregate } from '../outputs/TimeSheetAvgAggregate';
import { TimeSheetCountAggregate } from '../outputs/TimeSheetCountAggregate';
import { TimeSheetMaxAggregate } from '../outputs/TimeSheetMaxAggregate';
import { TimeSheetMinAggregate } from '../outputs/TimeSheetMinAggregate';
import { TimeSheetSumAggregate } from '../outputs/TimeSheetSumAggregate';

@TypeGraphQL.ObjectType('TimeSheetGroupBy', {
 description:"",
})
export class TimeSheetGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  StartDate!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  EndDate!: Date;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  TSCalendarID!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  TimeSheetFileName!: string | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalChargeableDay!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalChargeableHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalOTHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => TimeSheetCountAggregate, {
    nullable: true,
  })
  _count!: TimeSheetCountAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetAvgAggregate, {
    nullable: true,
  })
  _avg!: TimeSheetAvgAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetSumAggregate, {
    nullable: true,
  })
  _sum!: TimeSheetSumAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetMinAggregate, {
    nullable: true,
  })
  _min!: TimeSheetMinAggregate | null;

  @TypeGraphQL.Field((_type) => TimeSheetMaxAggregate, {
    nullable: true,
  })
  _max!: TimeSheetMaxAggregate | null;
}
