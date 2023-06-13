import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCreateInput } from '../../../inputs/TimeSheetCreateInput';
import { TimeSheetUpdateInput } from '../../../inputs/TimeSheetUpdateInput';
import { TimeSheetWhereUniqueInput } from '../../../inputs/TimeSheetWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TimeSheetCreateInput, {
    nullable: false,
  })
  create!: TimeSheetCreateInput;

  @TypeGraphQL.Field((_type) => TimeSheetUpdateInput, {
    nullable: false,
  })
  update!: TimeSheetUpdateInput;
}
