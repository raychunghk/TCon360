import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { AccountOrderByRelationAggregateInput } from '../inputs/AccountOrderByRelationAggregateInput';
import { SessionOrderByRelationAggregateInput } from '../inputs/SessionOrderByRelationAggregateInput';
import { StaffOrderByRelationAggregateInput } from '../inputs/StaffOrderByRelationAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('UserOrderByWithRelationInput', {
  description: '',
})
export class UserOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  username?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  email?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  emailVerified?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  image?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  password?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  createdAt?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  updatedAt?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  staffId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => AccountOrderByRelationAggregateInput, {
    nullable: true,
  })
  accounts?: AccountOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => SessionOrderByRelationAggregateInput, {
    nullable: true,
  })
  sessions?: SessionOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => StaffOrderByRelationAggregateInput, {
    nullable: true,
  })
  staff?: StaffOrderByRelationAggregateInput | undefined;
}
