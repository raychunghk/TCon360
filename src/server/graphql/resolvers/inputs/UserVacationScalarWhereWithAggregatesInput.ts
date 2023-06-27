import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeWithAggregatesFilter } from '../inputs/DateTimeWithAggregatesFilter';
import { DecimalWithAggregatesFilter } from '../inputs/DecimalWithAggregatesFilter';

@TypeGraphQL.InputType('UserVacationScalarWhereWithAggregatesInput', {
  description:"",
})
export class UserVacationScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [UserVacationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: UserVacationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: UserVacationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: UserVacationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  VacationDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  ChargeableDay?: DecimalWithAggregatesFilter | undefined;
}
