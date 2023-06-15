import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserWhereInput } from '../../../inputs/PostUserWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyPostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserWhereInput, {
    nullable: true,
  })
  where?: PostUserWhereInput | undefined;
}
