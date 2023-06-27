import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarCreateWithoutTimesheetInput } from '../inputs/TimeSheetCalendarCreateWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from '../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarCreateOrConnectWithoutTimesheetInput',
  {
    description:"",
  },
)
export class TimeSheetCalendarCreateOrConnectWithoutTimesheetInput {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarCreateWithoutTimesheetInput, {
    nullable: false,
  })
  create!: TimeSheetCalendarCreateWithoutTimesheetInput;
}
