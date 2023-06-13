import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterCreateInput } from '../../../inputs/CalendarMasterCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOneCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterCreateInput, {
    nullable: false,
  })
  data!: CalendarMasterCreateInput;
}
