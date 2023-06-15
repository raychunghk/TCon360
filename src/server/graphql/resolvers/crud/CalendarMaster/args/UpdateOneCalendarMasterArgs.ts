import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterUpdateInput } from '../../../inputs/CalendarMasterUpdateInput';
import { CalendarMasterWhereUniqueInput } from '../../../inputs/CalendarMasterWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOneCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterUpdateInput, {
    nullable: false,
  })
  data!: CalendarMasterUpdateInput;

  @TypeGraphQL.Field((_type) => CalendarMasterWhereUniqueInput, {
    nullable: false,
  })
  where!: CalendarMasterWhereUniqueInput;
}
