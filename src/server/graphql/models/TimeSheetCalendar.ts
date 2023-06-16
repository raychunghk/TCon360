import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { TimeSheet } from '../models/TimeSheet';

@TypeGraphQL.ObjectType('TimeSheetCalendar', {
  description: "",
})
export class TimeSheetCalendar {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  DayID!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  CalendarDate!: Date;

  timesheet?: TimeSheet;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  TimeSheetID!: number;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableDay!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  Traing!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  Vacation!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  PublicHoliday!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  WeekEnd!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  Others!: Prisma.Decimal;
}
