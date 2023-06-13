import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { IntWithAggregatesFilter } from './IntWithAggregatesFilter';
import { StringWithAggregatesFilter } from './StringWithAggregatesFilter';

@TypeGraphQL.InputType('StaffScalarWhereWithAggregatesInput')
export class StaffScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [StaffScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: StaffScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [StaffScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: StaffScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [StaffScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: StaffScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  StaffName?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  AgentName?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  StaffCategory?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  Department?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  PostUnit?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  ManagerName?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  ManagerTitle?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  ManagerEmail?: StringWithAggregatesFilter | undefined;
}
