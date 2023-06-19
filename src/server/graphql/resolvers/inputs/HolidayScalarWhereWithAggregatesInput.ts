import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeWithAggregatesFilter } from '../inputs/DateTimeWithAggregatesFilter';
import { StringNullableWithAggregatesFilter } from '../inputs/StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('HolidayScalarWhereWithAggregatesInput', {
 description:"",
})
export class HolidayScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [HolidayScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: HolidayScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [HolidayScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: HolidayScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [HolidayScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: HolidayScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  StartDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  EndDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  Summary?: StringNullableWithAggregatesFilter | undefined;
}
