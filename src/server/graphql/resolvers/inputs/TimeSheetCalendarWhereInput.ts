import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { DecimalFilter } from '../inputs/DecimalFilter';
import { IntFilter } from '../inputs/IntFilter';
import { TimeSheetRelationFilter } from '../inputs/TimeSheetRelationFilter';

@TypeGraphQL.InputType('TimeSheetCalendarWhereInput', {
  description: "",
})
export class TimeSheetCalendarWhereInput {
  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereInput], {
    nullable: true,
  })
  AND?: TimeSheetCalendarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereInput], {
    nullable: true,
  })
  OR?: TimeSheetCalendarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereInput], {
    nullable: true,
  })
  NOT?: TimeSheetCalendarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  DayID?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  CalendarDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  TimeSheetID?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  ChargeableDay?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  ChargeableHour?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  Traing?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  Vacation?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  PublicHoliday?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  WeekEnd?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalFilter, {
    nullable: true,
  })
  Others?: DecimalFilter | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetRelationFilter, {
    nullable: true,
  })
  timesheet?: TimeSheetRelationFilter | undefined;
}
