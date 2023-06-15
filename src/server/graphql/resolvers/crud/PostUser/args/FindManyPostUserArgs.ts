import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserOrderByWithRelationInput } from '../../../inputs/PostUserOrderByWithRelationInput';
import { PostUserWhereInput } from '../../../inputs/PostUserWhereInput';
import { PostUserWhereUniqueInput } from '../../../inputs/PostUserWhereUniqueInput';
import { PostUserScalarFieldEnum } from '../../../../enums/PostUserScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindManyPostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserWhereInput, {
    nullable: true,
  })
  where?: PostUserWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [PostUserOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: PostUserOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => PostUserWhereUniqueInput, {
    nullable: true,
  })
  cursor?: PostUserWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [PostUserScalarFieldEnum], {
    nullable: true,
  })
  distinct?: Array<'id' | 'email' | 'name'> | undefined;
}
