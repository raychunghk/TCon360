import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { IntWithAggregatesFilter } from '../inputs/IntWithAggregatesFilter';
import { StringNullableWithAggregatesFilter } from '../inputs/StringNullableWithAggregatesFilter';
import { StringWithAggregatesFilter } from '../inputs/StringWithAggregatesFilter';

@TypeGraphQL.InputType('PostUserScalarWhereWithAggregatesInput', {
 description:"",
})
export class PostUserScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [PostUserScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: PostUserScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostUserScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: PostUserScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostUserScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: PostUserScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  email?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringNullableWithAggregatesFilter | undefined;
}
