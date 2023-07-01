import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarCreateNestedManyWithoutTimesheetInput } from '../inputs/TimeSheetCalendarCreateNestedManyWithoutTimesheetInput';

@TypeGraphQL.InputType('TimeSheetCreateInput', {
  description: '',
})
export class TimeSheetCreateInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  StartDate!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  EndDate!: Date;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  TSCalendarID!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  TimeSheetFileName?: string | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  TotalChargeableDay?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  TotalChargeableHour?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: false,
  })
  TotalOTHour!: Prisma.Decimal;

  @TypeGraphQL.Field(
    (_type) => TimeSheetCalendarCreateNestedManyWithoutTimesheetInput,
    {
      nullable: true,
    },
  )
  calendar?: TimeSheetCalendarCreateNestedManyWithoutTimesheetInput | undefined;
}
