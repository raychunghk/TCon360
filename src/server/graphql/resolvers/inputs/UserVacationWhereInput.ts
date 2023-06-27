import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { DecimalFilter } from '../inputs/DecimalFilter';

@TypeGraphQL.InputType('UserVacationWhereInput', {
  description:"",
})
export class UserVacationWhereInput {
  @TypeGraphQL.Field((_type) => [UserVacationWhereInput], {
    nullable: true,
  })
  AND?: UserVacationWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationWhereInput], {
    nullable: true,
  })
  OR?: UserVacationWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationWhereInput], {
    nullable: true,
  })
  NOT?: UserVacationWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  VacationDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  ChargeableDay?: DecimalFilter | undefined;
}
