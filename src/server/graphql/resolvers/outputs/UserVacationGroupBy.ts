import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserVacationAvgAggregate } from '../outputs/UserVacationAvgAggregate';
import { UserVacationCountAggregate } from '../outputs/UserVacationCountAggregate';
import { UserVacationMaxAggregate } from '../outputs/UserVacationMaxAggregate';
import { UserVacationMinAggregate } from '../outputs/UserVacationMinAggregate';
import { UserVacationSumAggregate } from '../outputs/UserVacationSumAggregate';

@TypeGraphQL.ObjectType('UserVacationGroupBy', {})
export class UserVacationGroupBy {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  VacationDate!: Date;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableDay!: Prisma.Decimal;

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
