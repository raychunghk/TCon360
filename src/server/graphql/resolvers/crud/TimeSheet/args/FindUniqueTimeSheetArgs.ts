import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetWhereUniqueInput } from '../../../inputs/TimeSheetWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetWhereUniqueInput, {
    nullable: false,
  })
  where!: TimeSheetWhereUniqueInput;
}
