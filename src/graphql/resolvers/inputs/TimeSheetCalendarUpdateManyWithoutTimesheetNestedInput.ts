import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarCreateOrConnectWithoutTimesheetInput } from './TimeSheetCalendarCreateOrConnectWithoutTimesheetInput';
import { TimeSheetCalendarCreateWithoutTimesheetInput } from './TimeSheetCalendarCreateWithoutTimesheetInput';
import { TimeSheetCalendarScalarWhereInput } from './TimeSheetCalendarScalarWhereInput';
import { TimeSheetCalendarUpdateManyWithWhereWithoutTimesheetInput } from './TimeSheetCalendarUpdateManyWithWhereWithoutTimesheetInput';
import { TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput } from './TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput';
import { TimeSheetCalendarUpsertWithWhereUniqueWithoutTimesheetInput } from './TimeSheetCalendarUpsertWithWhereUniqueWithoutTimesheetInput';
import { TimeSheetCalendarWhereUniqueInput } from './TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarUpdateManyWithoutTimesheetNestedInput',
)
export class TimeSheetCalendarUpdateManyWithoutTimesheetNestedInput {
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

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarUpsertWithWhereUniqueWithoutTimesheetInput],
    {
      nullable: true,
    },
  )
  upsert?:
    | TimeSheetCalendarUpsertWithWhereUniqueWithoutTimesheetInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereUniqueInput], {
    nullable: true,
  })
  set?: TimeSheetCalendarWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: TimeSheetCalendarWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereUniqueInput], {
    nullable: true,
  })
  delete?: TimeSheetCalendarWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarWhereUniqueInput], {
    nullable: true,
  })
  connect?: TimeSheetCalendarWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput],
    {
      nullable: true,
    },
  )
  update?:
    | TimeSheetCalendarUpdateWithWhereUniqueWithoutTimesheetInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarUpdateManyWithWhereWithoutTimesheetInput],
    {
      nullable: true,
    },
  )
  updateMany?:
    | TimeSheetCalendarUpdateManyWithWhereWithoutTimesheetInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: TimeSheetCalendarScalarWhereInput[] | undefined;
}
