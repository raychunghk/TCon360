import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationWhereInput } from '../../../inputs/UserVacationWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationWhereInput, {
    nullable: true,
  })
  where?: UserVacationWhereInput | undefined;
}
