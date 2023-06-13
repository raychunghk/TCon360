import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeWithAggregatesFilter } from './DateTimeWithAggregatesFilter';
import { IntWithAggregatesFilter } from './IntWithAggregatesFilter';
import { StringNullableWithAggregatesFilter } from './StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('CalendarMasterScalarWhereWithAggregatesInput')
export class CalendarMasterScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [CalendarMasterScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  AND?: CalendarMasterScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [CalendarMasterScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  OR?: CalendarMasterScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [CalendarMasterScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  NOT?: CalendarMasterScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  CalendarDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  WeekDayName?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  Year?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  Month?: IntWithAggregatesFilter | undefined;
}
