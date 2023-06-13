import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from './DateTimeFilter';
import { DecimalFilter } from './DecimalFilter';
import { IntFilter } from './IntFilter';

@TypeGraphQL.InputType('TimeSheetCalendarScalarWhereInput')
export class TimeSheetCalendarScalarWhereInput {
  @TypeGraphQL.Field((_type) => [TimeSheetCalendarScalarWhereInput], {
    nullable: true,
  })
  AND?: TimeSheetCalendarScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarScalarWhereInput], {
    nullable: true,
  })
  OR?: TimeSheetCalendarScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarScalarWhereInput], {
    nullable: true,
  })
  NOT?: TimeSheetCalendarScalarWhereInput[] | undefined;

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
}
