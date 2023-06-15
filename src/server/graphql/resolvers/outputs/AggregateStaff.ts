import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffAvgAggregate } from '../outputs/StaffAvgAggregate';
import { StaffCountAggregate } from '../outputs/StaffCountAggregate';
import { StaffMaxAggregate } from '../outputs/StaffMaxAggregate';
import { StaffMinAggregate } from '../outputs/StaffMinAggregate';
import { StaffSumAggregate } from '../outputs/StaffSumAggregate';

@TypeGraphQL.ObjectType('AggregateStaff')
export class AggregateStaff {
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
