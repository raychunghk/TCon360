import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('TimeSheetCalendarMaxAggregate', {
  description:"",
})
export class TimeSheetCalendarMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  DayID!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  CalendarDate!: Date | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  TimeSheetID!: number | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  ChargeableDay!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  ChargeableHour!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  Training!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  Vacation!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  PublicHoliday!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  WeekEnd!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  Others!: Prisma.Decimal | null;
}
