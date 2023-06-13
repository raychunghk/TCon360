import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('UserVacationAvgAggregate')
export class UserVacationAvgAggregate {
  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  ChargeableDay!: Prisma.Decimal | null;
}
