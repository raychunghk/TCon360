import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterUpdateManyMutationInput } from '../../../inputs/CalendarMasterUpdateManyMutationInput';
import { CalendarMasterWhereInput } from '../../../inputs/CalendarMasterWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterUpdateManyMutationInput, {
    nullable: false,
  })
  data!: CalendarMasterUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => CalendarMasterWhereInput, {
    nullable: true,
  })
  where?: CalendarMasterWhereInput | undefined;
}
