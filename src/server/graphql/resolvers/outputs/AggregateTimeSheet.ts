import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetAvgAggregate } from '../outputs/TimeSheetAvgAggregate';
import { TimeSheetCountAggregate } from '../outputs/TimeSheetCountAggregate';
import { TimeSheetMaxAggregate } from '../outputs/TimeSheetMaxAggregate';
import { TimeSheetMinAggregate } from '../outputs/TimeSheetMinAggregate';
import { TimeSheetSumAggregate } from '../outputs/TimeSheetSumAggregate';

@TypeGraphQL.ObjectType('AggregateTimeSheet', {
  description: "",
})
export class AggregateTimeSheet {
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
