import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarUpdateManyMutationInput } from '../../../inputs/TimeSheetCalendarUpdateManyMutationInput';
import { TimeSheetCalendarWhereInput } from '../../../inputs/TimeSheetCalendarWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarUpdateManyMutationInput, {
    nullable: false,
  })
  data!: TimeSheetCalendarUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  where?: TimeSheetCalendarWhereInput | undefined;
}
