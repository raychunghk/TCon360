import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { PostUserOrderByWithAggregationInput } from '../../../inputs/PostUserOrderByWithAggregationInput';
import { PostUserScalarWhereWithAggregatesInput } from '../../../inputs/PostUserScalarWhereWithAggregatesInput';
import { PostUserWhereInput } from '../../../inputs/PostUserWhereInput';
import { PostUserScalarFieldEnum } from '../../../../enums/PostUserScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByPostUserArgs {
  @TypeGraphQL.Field((_type) => PostUserWhereInput, {
    nullable: true,
  })
  where?: PostUserWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [PostUserOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: PostUserOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostUserScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<'id' | 'email' | 'name'>;

  @TypeGraphQL.Field((_type) => PostUserScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: PostUserScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
