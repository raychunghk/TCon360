import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserAvgOrderByAggregateInput } from '../inputs/PostUserAvgOrderByAggregateInput';
import { PostUserCountOrderByAggregateInput } from '../inputs/PostUserCountOrderByAggregateInput';
import { PostUserMaxOrderByAggregateInput } from '../inputs/PostUserMaxOrderByAggregateInput';
import { PostUserMinOrderByAggregateInput } from '../inputs/PostUserMinOrderByAggregateInput';
import { PostUserSumOrderByAggregateInput } from '../inputs/PostUserSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('PostUserOrderByWithAggregationInput', {
  description:"",
})
export class PostUserOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  email?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => PostUserCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: PostUserCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: PostUserAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: PostUserMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: PostUserMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: PostUserSumOrderByAggregateInput | undefined;
}
