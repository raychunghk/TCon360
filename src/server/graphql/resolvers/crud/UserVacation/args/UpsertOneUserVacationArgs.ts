import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationCreateInput } from '../../../inputs/UserVacationCreateInput';
import { UserVacationUpdateInput } from '../../../inputs/UserVacationUpdateInput';
import { UserVacationWhereUniqueInput } from '../../../inputs/UserVacationWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationWhereUniqueInput, {
    nullable: false,
  })
  where!: UserVacationWhereUniqueInput;

  @TypeGraphQL.Field((_type) => UserVacationCreateInput, {
    nullable: false,
  })
  create!: UserVacationCreateInput;

  @TypeGraphQL.Field((_type) => UserVacationUpdateInput, {
    nullable: false,
  })
  update!: UserVacationUpdateInput;
}
