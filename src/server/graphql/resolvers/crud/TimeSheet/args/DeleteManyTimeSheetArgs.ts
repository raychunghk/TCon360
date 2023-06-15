import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetWhereInput } from '../../../inputs/TimeSheetWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetWhereInput, {
    nullable: true,
  })
  where?: TimeSheetWhereInput | undefined;
}
