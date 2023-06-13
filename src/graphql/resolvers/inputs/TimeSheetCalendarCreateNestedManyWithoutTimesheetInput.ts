import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarCreateOrConnectWithoutTimesheetInput } from './TimeSheetCalendarCreateOrConnectWithoutTimesheetInput';
import { TimeSheetCalendarCreateWithoutTimesheetInput } from './TimeSheetCalendarCreateWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from './TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarCreateNestedManyWithoutTimesheetInput',
)
export class TimeSheetCalendarCreateNestedManyWithoutTimesheetInput {
  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarCreateWithoutTimesheetInput],
    {
      nullable: true,
    },
  )
  create?: TimeSheetCalendarCreateWithoutTimesheetInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarCreateOrConnectWithoutTimesheetInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | TimeSheetCalendarCreateOrConnectWithoutTimesheetInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereUniqueInput], {
    nullable: true,
  })
  connect?: TimeSheetCalendarWhereUniqueInput[] | undefined;
}
