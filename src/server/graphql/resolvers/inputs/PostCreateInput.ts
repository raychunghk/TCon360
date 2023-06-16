import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserCreateNestedOneWithoutPostsInput } from '../inputs/PostUserCreateNestedOneWithoutPostsInput';

@TypeGraphQL.InputType('PostCreateInput', {
  description: "",
})
export class PostCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  title!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  content?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  published?: boolean | undefined;

  @TypeGraphQL.Field((_type) => PostUserCreateNestedOneWithoutPostsInput, {
    nullable: false,
  })
  author!: PostUserCreateNestedOneWithoutPostsInput;
}
