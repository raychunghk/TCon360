import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarWhereInput } from '../inputs/TimeSheetCalendarWhereInput';

@TypeGraphQL.InputType('TimeSheetCalendarListRelationFilter')
export class TimeSheetCalendarListRelationFilter {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  every?: TimeSheetCalendarWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  some?: TimeSheetCalendarWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  none?: TimeSheetCalendarWhereInput | undefined;
}
