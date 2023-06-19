import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCreateNestedOneWithoutCalendarInput } from '../inputs/TimeSheetCreateNestedOneWithoutCalendarInput';

@TypeGraphQL.InputType('TimeSheetCalendarCreateInput', {
 description:"",
})
export class TimeSheetCalendarCreateInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  DayID!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  CalendarDate!: Date;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableDay!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  ChargeableHour!: Prisma.Decimal;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  Traing?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  Vacation?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  PublicHoliday?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  WeekEnd?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  Others?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCreateNestedOneWithoutCalendarInput, {
    nullable: false,
  })
  timesheet!: TimeSheetCreateNestedOneWithoutCalendarInput;
}
