import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { DecimalFilter } from '../inputs/DecimalFilter';
import { IntFilter } from '../inputs/IntFilter';
import { TimeSheetCalendarListRelationFilter } from '../inputs/TimeSheetCalendarListRelationFilter';

@TypeGraphQL.InputType('TimeSheetWhereInput', {
  description: "",
})
export class TimeSheetWhereInput {
  @TypeGraphQL.Field((_type) => [TimeSheetWhereInput], {
    nullable: true,
  })
  AND?: TimeSheetWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetWhereInput], {
    nullable: true,
  })
  OR?: TimeSheetWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetWhereInput], {
    nullable: true,
  })
  NOT?: TimeSheetWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  StartDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  EndDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  TSCalendarID?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  TotalChargeableDay?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  TotalChargeableHour?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  TotalOTHour?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarListRelationFilter, {
    nullable: true,
  })
  calendar?: TimeSheetCalendarListRelationFilter | undefined;
}
