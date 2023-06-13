import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserAvgOrderByAggregateInput } from './UserAvgOrderByAggregateInput';
import { UserCountOrderByAggregateInput } from './UserCountOrderByAggregateInput';
import { UserMaxOrderByAggregateInput } from './UserMaxOrderByAggregateInput';
import { UserMinOrderByAggregateInput } from './UserMinOrderByAggregateInput';
import { UserSumOrderByAggregateInput } from './UserSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('UserOrderByWithAggregationInput')
export class UserOrderByWithAggregationInput {
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

  @TypeGraphQL.Field((_type) => UserCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: UserCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: UserAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: UserMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: UserMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: UserSumOrderByAggregateInput | undefined;
}
