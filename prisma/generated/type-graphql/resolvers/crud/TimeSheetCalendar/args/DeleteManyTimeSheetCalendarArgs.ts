import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarWhereInput } from '../../../inputs/TimeSheetCalendarWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  where?: TimeSheetCalendarWhereInput | undefined;
}
