import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCreateWithoutCalendarInput } from '../inputs/TimeSheetCreateWithoutCalendarInput';
import { TimeSheetUpdateWithoutCalendarInput } from '../inputs/TimeSheetUpdateWithoutCalendarInput';

@TypeGraphQL.InputType('TimeSheetUpsertWithoutCalendarInput', {
  description: "",
})
export class TimeSheetUpsertWithoutCalendarInput {
  @TypeGraphQL.Field((_type) => TimeSheetUpdateWithoutCalendarInput, {
    nullable: false,
  })
  update!: TimeSheetUpdateWithoutCalendarInput;

  @TypeGraphQL.Field((_type) => TimeSheetCreateWithoutCalendarInput, {
    nullable: false,
  })
  create!: TimeSheetCreateWithoutCalendarInput;
}
