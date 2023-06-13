import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarCreateInput } from '../../../inputs/TimeSheetCalendarCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOneTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarCreateInput, {
    nullable: false,
  })
  data!: TimeSheetCalendarCreateInput;
}
