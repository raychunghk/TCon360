import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationUpdateInput } from '../../../inputs/UserVacationUpdateInput';
import { UserVacationWhereUniqueInput } from '../../../inputs/UserVacationWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOneUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationUpdateInput, {
    nullable: false,
  })
  data!: UserVacationUpdateInput;

  @TypeGraphQL.Field((_type) => UserVacationWhereUniqueInput, {
    nullable: false,
  })
  where!: UserVacationWhereUniqueInput;
}
