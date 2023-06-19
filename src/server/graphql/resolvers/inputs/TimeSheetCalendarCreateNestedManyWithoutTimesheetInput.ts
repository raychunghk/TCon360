import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarCreateOrConnectWithoutTimesheetInput } from '../inputs/TimeSheetCalendarCreateOrConnectWithoutTimesheetInput';
import { TimeSheetCalendarCreateWithoutTimesheetInput } from '../inputs/TimeSheetCalendarCreateWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from '../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarCreateNestedManyWithoutTimesheetInput',
  {
   description:"",
  },
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
