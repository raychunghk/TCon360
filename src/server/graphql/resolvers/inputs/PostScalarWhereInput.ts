import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { BoolFilter } from '../inputs/BoolFilter';
import { IntFilter } from '../inputs/IntFilter';
import { StringFilter } from '../inputs/StringFilter';
import { StringNullableFilter } from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('PostScalarWhereInput', {
  description:"",
})
export class PostScalarWhereInput {
  @TypeGraphQL.Field((_type) => [PostScalarWhereInput], {
    nullable: true,
  })
  AND?: PostScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostScalarWhereInput], {
    nullable: true,
  })
  OR?: PostScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostScalarWhereInput], {
    nullable: true,
  })
  NOT?: PostScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  title?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  content?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolFilter, {
    nullable: true,
  })
  published?: BoolFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  authorId?: IntFilter | undefined;
}
