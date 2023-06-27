import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.InputType('UserVacationCreateInput', {
  description:"",
})
export class UserVacationCreateInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  VacationDate!: Date;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableDay!: Prisma.Decimal;
}
