import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { BoolWithAggregatesFilter } from './BoolWithAggregatesFilter';
import { IntWithAggregatesFilter } from './IntWithAggregatesFilter';
import { StringNullableWithAggregatesFilter } from './StringNullableWithAggregatesFilter';
import { StringWithAggregatesFilter } from './StringWithAggregatesFilter';

@TypeGraphQL.InputType('PostScalarWhereWithAggregatesInput')
export class PostScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [PostScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: PostScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: PostScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: PostScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  title?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  content?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolWithAggregatesFilter, {
    nullable: true,
  })
  published?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  authorId?: IntWithAggregatesFilter | undefined;
}
