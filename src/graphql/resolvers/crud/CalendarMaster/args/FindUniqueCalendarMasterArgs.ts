import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterWhereUniqueInput } from '../../../inputs/CalendarMasterWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterWhereUniqueInput, {
    nullable: false,
  })
  where!: CalendarMasterWhereUniqueInput;
}
