import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarCreateInput } from '../../../inputs/TimeSheetCalendarCreateInput';
import { TimeSheetCalendarUpdateInput } from '../../../inputs/TimeSheetCalendarUpdateInput';
import { TimeSheetCalendarWhereUniqueInput } from '../../../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarCreateInput, {
    nullable: false,
  })
  create!: TimeSheetCalendarCreateInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarUpdateInput, {
    nullable: false,
  })
  update!: TimeSheetCalendarUpdateInput;
}
