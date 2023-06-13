import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationUpdateManyMutationInput } from '../../../inputs/UserVacationUpdateManyMutationInput';
import { UserVacationWhereInput } from '../../../inputs/UserVacationWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationUpdateManyMutationInput, {
    nullable: false,
  })
  data!: UserVacationUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => UserVacationWhereInput, {
    nullable: true,
  })
  where?: UserVacationWhereInput | undefined;
}
