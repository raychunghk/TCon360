import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostCreateWithoutAuthorInput } from './PostCreateWithoutAuthorInput';
import { PostWhereUniqueInput } from './PostWhereUniqueInput';

@TypeGraphQL.InputType('PostCreateOrConnectWithoutAuthorInput')
export class PostCreateOrConnectWithoutAuthorInput {
  @TypeGraphQL.Field((_type) => PostWhereUniqueInput, {
    nullable: false,
  })
  where!: PostWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PostCreateWithoutAuthorInput, {
    nullable: false,
  })
  create!: PostCreateWithoutAuthorInput;
}
