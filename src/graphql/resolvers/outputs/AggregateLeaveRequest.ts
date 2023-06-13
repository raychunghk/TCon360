import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestAvgAggregate } from './LeaveRequestAvgAggregate';
import { LeaveRequestCountAggregate } from './LeaveRequestCountAggregate';
import { LeaveRequestMaxAggregate } from './LeaveRequestMaxAggregate';
import { LeaveRequestMinAggregate } from './LeaveRequestMinAggregate';
import { LeaveRequestSumAggregate } from './LeaveRequestSumAggregate';

@TypeGraphQL.ObjectType('AggregateLeaveRequest')
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
