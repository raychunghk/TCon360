import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterWhereInput } from '../../../inputs/CalendarMasterWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterWhereInput, {
    nullable: true,
  })
  where?: CalendarMasterWhereInput | undefined;
}
