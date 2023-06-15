import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('UserVacationMinAggregate')
export class UserVacationMinAggregate {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  VacationDate!: Date | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  ChargeableDay!: Prisma.Decimal | null;
}
