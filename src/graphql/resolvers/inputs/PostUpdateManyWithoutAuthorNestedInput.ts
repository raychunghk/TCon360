import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostCreateOrConnectWithoutAuthorInput } from './PostCreateOrConnectWithoutAuthorInput';
import { PostCreateWithoutAuthorInput } from './PostCreateWithoutAuthorInput';
import { PostScalarWhereInput } from './PostScalarWhereInput';
import { PostUpdateManyWithWhereWithoutAuthorInput } from './PostUpdateManyWithWhereWithoutAuthorInput';
import { PostUpdateWithWhereUniqueWithoutAuthorInput } from './PostUpdateWithWhereUniqueWithoutAuthorInput';
import { PostUpsertWithWhereUniqueWithoutAuthorInput } from './PostUpsertWithWhereUniqueWithoutAuthorInput';
import { PostWhereUniqueInput } from './PostWhereUniqueInput';

@TypeGraphQL.InputType('PostUpdateManyWithoutAuthorNestedInput')
export class PostUpdateManyWithoutAuthorNestedInput {
  @TypeGraphQL.Field((_type) => [PostCreateWithoutAuthorInput], {
    nullable: true,
  })
  create?: PostCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostCreateOrConnectWithoutAuthorInput], {
    nullable: true,
  })
  connectOrCreate?: PostCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostUpsertWithWhereUniqueWithoutAuthorInput], {
    nullable: true,
  })
  upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostWhereUniqueInput], {
    nullable: true,
  })
  set?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostWhereUniqueInput], {
    nullable: true,
  })
  delete?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostWhereUniqueInput], {
    nullable: true,
  })
  connect?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostUpdateWithWhereUniqueWithoutAuthorInput], {
    nullable: true,
  })
  update?: PostUpdateWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostUpdateManyWithWhereWithoutAuthorInput], {
    nullable: true,
  })
  updateMany?: PostUpdateManyWithWhereWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PostScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: PostScalarWhereInput[] | undefined;
}
