import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarUpdateWithoutTimesheetInput } from './TimeSheetCalendarUpdateWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from './TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput',
)
export class TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarUpdateWithoutTimesheetInput, {
    nullable: false,
  })
  data!: TimeSheetCalendarUpdateWithoutTimesheetInput;
}
