import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarWhereUniqueInput } from '../../../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarWhereUniqueInput;
}
