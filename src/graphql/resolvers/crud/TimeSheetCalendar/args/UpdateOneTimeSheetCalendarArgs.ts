import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarUpdateInput } from '../../../inputs/TimeSheetCalendarUpdateInput';
import { TimeSheetCalendarWhereUniqueInput } from '../../../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOneTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarUpdateInput, {
    nullable: false,
  })
  data!: TimeSheetCalendarUpdateInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetCalendarWhereUniqueInput;
}
