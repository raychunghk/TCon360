import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCreateOrConnectWithoutCalendarInput } from '../inputs/TimeSheetCreateOrConnectWithoutCalendarInput';
import { TimeSheetCreateWithoutCalendarInput } from '../inputs/TimeSheetCreateWithoutCalendarInput';
import { TimeSheetUpdateWithoutCalendarInput } from '../inputs/TimeSheetUpdateWithoutCalendarInput';
import { TimeSheetUpsertWithoutCalendarInput } from '../inputs/TimeSheetUpsertWithoutCalendarInput';
import { TimeSheetWhereUniqueInput } from '../inputs/TimeSheetWhereUniqueInput';

@TypeGraphQL.InputType('TimeSheetUpdateOneRequiredWithoutCalendarNestedInput', {
  description:"",
})
export class TimeSheetUpdateOneRequiredWithoutCalendarNestedInput {
  @TypeGraphQL.Field((_type) => TimeSheetCreateWithoutCalendarInput, {
    nullable: true,
  })
  create?: TimeSheetCreateWithoutCalendarInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCreateOrConnectWithoutCalendarInput, {
    nullable: true,
  })
  connectOrCreate?: TimeSheetCreateOrConnectWithoutCalendarInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetUpsertWithoutCalendarInput, {
    nullable: true,
  })
  upsert?: TimeSheetUpsertWithoutCalendarInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetWhereUniqueInput, {
    nullable: true,
  })
  connect?: TimeSheetWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetUpdateWithoutCalendarInput, {
    nullable: true,
  })
  update?: TimeSheetUpdateWithoutCalendarInput | undefined;
}
