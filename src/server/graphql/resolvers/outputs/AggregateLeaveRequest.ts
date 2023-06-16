import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestAvgAggregate } from '../outputs/LeaveRequestAvgAggregate';
import { LeaveRequestCountAggregate } from '../outputs/LeaveRequestCountAggregate';
import { LeaveRequestMaxAggregate } from '../outputs/LeaveRequestMaxAggregate';
import { LeaveRequestMinAggregate } from '../outputs/LeaveRequestMinAggregate';
import { LeaveRequestSumAggregate } from '../outputs/LeaveRequestSumAggregate';

@TypeGraphQL.ObjectType('AggregateLeaveRequest', {
  description: "",
})
export class AggregateLeaveRequest {
  @TypeGraphQL.Field((_type) => LeaveRequestCountAggregate, {
    nullable: true,
  })
  _count!: LeaveRequestCountAggregate | null;

  @TypeGraphQL.Field((_type) => LeaveRequestAvgAggregate, {
    nullable: true,
  })
  _avg!: LeaveRequestAvgAggregate | null;

  @TypeGraphQL.Field((_type) => LeaveRequestSumAggregate, {
    nullable: true,
  })
  _sum!: LeaveRequestSumAggregate | null;

  @TypeGraphQL.Field((_type) => LeaveRequestMinAggregate, {
    nullable: true,
  })
  _min!: LeaveRequestMinAggregate | null;

  @TypeGraphQL.Field((_type) => LeaveRequestMaxAggregate, {
    nullable: true,
  })
  _max!: LeaveRequestMaxAggregate | null;
}
