import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostUserAvgAggregate } from '../outputs/PostUserAvgAggregate';
import { PostUserCountAggregate } from '../outputs/PostUserCountAggregate';
import { PostUserMaxAggregate } from '../outputs/PostUserMaxAggregate';
import { PostUserMinAggregate } from '../outputs/PostUserMinAggregate';
import { PostUserSumAggregate } from '../outputs/PostUserSumAggregate';

@TypeGraphQL.ObjectType('AggregatePostUser')
export class AggregatePostUser {
  @TypeGraphQL.Field((_type) => PostUserCountAggregate, {
    nullable: true,
  })
  _count!: PostUserCountAggregate | null;

  @TypeGraphQL.Field((_type) => PostUserAvgAggregate, {
    nullable: true,
  })
  _avg!: PostUserAvgAggregate | null;

  @TypeGraphQL.Field((_type) => PostUserSumAggregate, {
    nullable: true,
  })
  _sum!: PostUserSumAggregate | null;

  @TypeGraphQL.Field((_type) => PostUserMinAggregate, {
    nullable: true,
  })
  _min!: PostUserMinAggregate | null;

  @TypeGraphQL.Field((_type) => PostUserMaxAggregate, {
    nullable: true,
  })
  _max!: PostUserMaxAggregate | null;
}
