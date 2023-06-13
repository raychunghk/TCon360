import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from './DateTimeFilter';
import { StringNullableFilter } from './StringNullableFilter';

@TypeGraphQL.InputType('HolidayWhereInput')
export class HolidayWhereInput {
  @TypeGraphQL.Field((_type) => [HolidayWhereInput], {
    nullable: true,
  })
  AND?: HolidayWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [HolidayWhereInput], {
    nullable: true,
  })
  OR?: HolidayWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [HolidayWhereInput], {
    nullable: true,
  })
  NOT?: HolidayWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  StartDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  EndDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  Summary?: StringNullableFilter | undefined;
}
