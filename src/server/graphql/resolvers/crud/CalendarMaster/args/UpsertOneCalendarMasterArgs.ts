import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterCreateInput } from '../../../inputs/CalendarMasterCreateInput';
import { CalendarMasterUpdateInput } from '../../../inputs/CalendarMasterUpdateInput';
import { CalendarMasterWhereUniqueInput } from '../../../inputs/CalendarMasterWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterWhereUniqueInput, {
    nullable: false,
  })
  where!: CalendarMasterWhereUniqueInput;

  @TypeGraphQL.Field((_type) => CalendarMasterCreateInput, {
    nullable: false,
  })
  create!: CalendarMasterCreateInput;

  @TypeGraphQL.Field((_type) => CalendarMasterUpdateInput, {
    nullable: false,
  })
  update!: CalendarMasterUpdateInput;
}
