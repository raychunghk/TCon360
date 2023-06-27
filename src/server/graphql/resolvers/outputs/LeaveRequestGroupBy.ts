import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestAvgAggregate } from '../outputs/LeaveRequestAvgAggregate';
import { LeaveRequestCountAggregate } from '../outputs/LeaveRequestCountAggregate';
import { LeaveRequestMaxAggregate } from '../outputs/LeaveRequestMaxAggregate';
import { LeaveRequestMinAggregate } from '../outputs/LeaveRequestMinAggregate';
import { LeaveRequestSumAggregate } from '../outputs/LeaveRequestSumAggregate';

@TypeGraphQL.ObjectType('LeaveRequestGroupBy', {
  description:"",
})
export class LeaveRequestGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodStart!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMStart!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodEnd!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMEnd!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  leaveDays!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  dateOfReturn!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  staffSignDate!: Date;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  fileId!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  staffId!: number;

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
