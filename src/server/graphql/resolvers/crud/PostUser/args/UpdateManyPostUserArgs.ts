import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserUpdateManyMutationInput } from '../../../inputs/PostUserUpdateManyMutationInput';
import { PostUserWhereInput } from '../../../inputs/PostUserWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyPostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserUpdateManyMutationInput, {
    nullable: false,
  })
  data!: PostUserUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => PostUserWhereInput, {
    nullable: true,
  })
  where?: PostUserWhereInput | undefined;
}
