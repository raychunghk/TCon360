import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarUpdateWithoutTimesheetInput } from '../inputs/TimeSheetCalendarUpdateWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from '../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput',
  {
    description: '',
  },
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
