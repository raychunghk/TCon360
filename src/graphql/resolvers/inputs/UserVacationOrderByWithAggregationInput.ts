import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserVacationAvgOrderByAggregateInput } from './UserVacationAvgOrderByAggregateInput';
import { UserVacationCountOrderByAggregateInput } from './UserVacationCountOrderByAggregateInput';
import { UserVacationMaxOrderByAggregateInput } from './UserVacationMaxOrderByAggregateInput';
import { UserVacationMinOrderByAggregateInput } from './UserVacationMinOrderByAggregateInput';
import { UserVacationSumOrderByAggregateInput } from './UserVacationSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('UserVacationOrderByWithAggregationInput')
export class UserVacationOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  VacationDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ChargeableDay?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => UserVacationCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: UserVacationCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserVacationAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: UserVacationAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserVacationMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: UserVacationMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserVacationMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: UserVacationMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserVacationSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: UserVacationSumOrderByAggregateInput | undefined;
}
