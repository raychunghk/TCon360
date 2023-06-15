import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCreateInput } from '../../../inputs/TimeSheetCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOneTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCreateInput, {
    nullable: false,
  })
  data!: TimeSheetCreateInput;
}
