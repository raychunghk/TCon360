import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserCreateInput } from '../../../inputs/PostUserCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOnePostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserCreateInput, {
    nullable: false,
  })
  data!: PostUserCreateInput;
}
