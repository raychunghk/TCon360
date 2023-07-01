import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetCalendarScalarWhereInput } from '../inputs/TimeSheetCalendarScalarWhereInput';
import { TimeSheetCalendarUpdateManyMutationInput } from '../inputs/TimeSheetCalendarUpdateManyMutationInput';

@TypeGraphQL.InputType(
  'TimeSheetCalendarUpdateManyWithWhereWithoutTimesheetInput',
  {
    description: '',
  },
)
export class TimeSheetCalendarUpdateManyWithWhereWithoutTimesheetInput {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarScalarWhereInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarScalarWhereInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarUpdateManyMutationInput, {
    nullable: false,
  })
  data!: TimeSheetCalendarUpdateManyMutationInput;
}
