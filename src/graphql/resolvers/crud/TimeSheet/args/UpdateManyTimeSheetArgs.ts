import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetUpdateManyMutationInput } from '../../../inputs/TimeSheetUpdateManyMutationInput';
import { TimeSheetWhereInput } from '../../../inputs/TimeSheetWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetUpdateManyMutationInput, {
    nullable: false,
  })
  data!: TimeSheetUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => TimeSheetWhereInput, {
    nullable: true,
  })
  where?: TimeSheetWhereInput | undefined;
}
