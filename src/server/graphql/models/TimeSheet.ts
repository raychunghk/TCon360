import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { TimeSheetCalendar } from '../models/TimeSheetCalendar';
import { TimeSheetCount } from '../resolvers/outputs/TimeSheetCount';

@TypeGraphQL.ObjectType('TimeSheet', {
  description: "",
})
export class TimeSheet {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  StartDate!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  EndDate!: Date;

  calendar?: TimeSheetCalendar[];

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  TSCalendarID!: number;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalChargeableDay!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalChargeableHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalOTHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => TimeSheetCount, {
    nullable: true,
  })
  _count?: TimeSheetCount | null;
}
