import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarCreateWithoutTimesheetInput } from './TimeSheetCalendarCreateWithoutTimesheetInput';
import { TimeSheetCalendarUpdateWithoutTimesheetInput } from './TimeSheetCalendarUpdateWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from './TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarUpsertWithWhereUniqueWithoutTimesheetInput',
)
export class TimeSheetCalendarUpsertWithWhereUniqueWithoutTimesheetInput {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarUpdateWithoutTimesheetInput, {
    nullable: false,
  })
  update!: TimeSheetCalendarUpdateWithoutTimesheetInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarCreateWithoutTimesheetInput, {
    nullable: false,
  })
  create!: TimeSheetCalendarCreateWithoutTimesheetInput;
}
