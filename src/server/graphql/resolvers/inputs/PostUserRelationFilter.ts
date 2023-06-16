import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserWhereInput } from '../inputs/PostUserWhereInput';

@TypeGraphQL.InputType('PostUserRelationFilter')
export class PostUserRelationFilter {
  @TypeGraphQL.Field((_type) => PostUserWhereInput, {
    nullable: true,
  })
  is?: PostUserWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PostUserWhereInput, {
    nullable: true,
  })
  isNot?: PostUserWhereInput | undefined;
}
