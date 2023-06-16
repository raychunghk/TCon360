import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCreateWithoutCalendarInput } from '../inputs/TimeSheetCreateWithoutCalendarInput';
import { TimeSheetWhereUniqueInput } from '../inputs/TimeSheetWhereUniqueInput';

@TypeGraphQL.InputType('TimeSheetCreateOrConnectWithoutCalendarInput')
export class TimeSheetCreateOrConnectWithoutCalendarInput {
  @TypeGraphQL.Field((_type) => TimeSheetWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TimeSheetCreateWithoutCalendarInput, {
    nullable: false,
  })
  create!: TimeSheetCreateWithoutCalendarInput;
}
