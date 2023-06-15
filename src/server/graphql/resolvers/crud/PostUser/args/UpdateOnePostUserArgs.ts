import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserUpdateInput } from '../../../inputs/PostUserUpdateInput';
import { PostUserWhereUniqueInput } from '../../../inputs/PostUserWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOnePostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserUpdateInput, {
    nullable: false,
  })
  data!: PostUserUpdateInput;

  @TypeGraphQL.Field((_type) => PostUserWhereUniqueInput, {
    nullable: false,
  })
  where!: PostUserWhereUniqueInput;
}
