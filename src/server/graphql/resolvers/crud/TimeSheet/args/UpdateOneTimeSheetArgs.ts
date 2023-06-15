import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetUpdateInput } from '../../../inputs/TimeSheetUpdateInput';
import { TimeSheetWhereUniqueInput } from '../../../inputs/TimeSheetWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOneTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetUpdateInput, {
    nullable: false,
  })
  data!: TimeSheetUpdateInput;

  @TypeGraphQL.Field((_type) => TimeSheetWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetWhereUniqueInput;
}
