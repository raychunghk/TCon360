import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserVacationAvgAggregate } from './UserVacationAvgAggregate';
import { UserVacationCountAggregate } from './UserVacationCountAggregate';
import { UserVacationMaxAggregate } from './UserVacationMaxAggregate';
import { UserVacationMinAggregate } from './UserVacationMinAggregate';
import { UserVacationSumAggregate } from './UserVacationSumAggregate';

@TypeGraphQL.ObjectType('AggregateUserVacation')
export class AggregateUserVacation {
  @TypeGraphQL.Field((_type) => UserVacationCountAggregate, {
    nullable: true,
  })
  _count!: UserVacationCountAggregate | null;

  @TypeGraphQL.Field((_type) => UserVacationAvgAggregate, {
    nullable: true,
  })
  _avg!: UserVacationAvgAggregate | null;

  @TypeGraphQL.Field((_type) => UserVacationSumAggregate, {
    nullable: true,
  })
  _sum!: UserVacationSumAggregate | null;

  @TypeGraphQL.Field((_type) => UserVacationMinAggregate, {
    nullable: true,
  })
  _min!: UserVacationMinAggregate | null;

  @TypeGraphQL.Field((_type) => UserVacationMaxAggregate, {
    nullable: true,
  })
  _max!: UserVacationMaxAggregate | null;
}
