import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserCreateInput } from '../../../inputs/PostUserCreateInput';
import { PostUserUpdateInput } from '../../../inputs/PostUserUpdateInput';
import { PostUserWhereUniqueInput } from '../../../inputs/PostUserWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOnePostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserWhereUniqueInput, {
    nullable: false,
  })
  where!: PostUserWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PostUserCreateInput, {
    nullable: false,
  })
  create!: PostUserCreateInput;

  @TypeGraphQL.Field((_type) => PostUserUpdateInput, {
    nullable: false,
  })
  update!: PostUserUpdateInput;
}
