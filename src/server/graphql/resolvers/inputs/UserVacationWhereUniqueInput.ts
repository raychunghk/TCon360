import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.InputType('UserVacationWhereUniqueInput', {
  description:"",
})
export class UserVacationWhereUniqueInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  VacationDate?: Date | undefined;
}
