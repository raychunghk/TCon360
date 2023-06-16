import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffAvgAggregate } from '../outputs/StaffAvgAggregate';
import { StaffCountAggregate } from '../outputs/StaffCountAggregate';
import { StaffMaxAggregate } from '../outputs/StaffMaxAggregate';
import { StaffMinAggregate } from '../outputs/StaffMinAggregate';
import { StaffSumAggregate } from '../outputs/StaffSumAggregate';

@TypeGraphQL.ObjectType('StaffGroupBy', {})
export class StaffGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  StaffName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  AgentName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  StaffCategory!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  Department!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  PostUnit!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  ManagerName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  ManagerTitle!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  ManagerEmail!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  userId!: string | null;

  @TypeGraphQL.Field((_type) => StaffCountAggregate, {
    nullable: true,
  })
  _count!: StaffCountAggregate | null;

  @TypeGraphQL.Field((_type) => StaffAvgAggregate, {
    nullable: true,
  })
  _avg!: StaffAvgAggregate | null;

  @TypeGraphQL.Field((_type) => StaffSumAggregate, {
    nullable: true,
  })
  _sum!: StaffSumAggregate | null;

  @TypeGraphQL.Field((_type) => StaffMinAggregate, {
    nullable: true,
  })
  _min!: StaffMinAggregate | null;

  @TypeGraphQL.Field((_type) => StaffMaxAggregate, {
    nullable: true,
  })
  _max!: StaffMaxAggregate | null;
}
