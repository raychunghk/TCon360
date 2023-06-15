import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationCreateInput } from '../../../inputs/UserVacationCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOneUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationCreateInput, {
    nullable: false,
  })
  data!: UserVacationCreateInput;
}
