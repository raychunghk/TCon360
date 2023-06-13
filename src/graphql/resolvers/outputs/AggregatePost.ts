import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { PostAvgAggregate } from './PostAvgAggregate';
import { PostCountAggregate } from './PostCountAggregate';
import { PostMaxAggregate } from './PostMaxAggregate';
import { PostMinAggregate } from './PostMinAggregate';
import { PostSumAggregate } from './PostSumAggregate';

@TypeGraphQL.ObjectType('AggregatePost')
export class AggregatePost {
  @TypeGraphQL.Field((_type) => PostCountAggregate, {
    nullable: true,
  })
  _count!: PostCountAggregate | null;

  @TypeGraphQL.Field((_type) => PostAvgAggregate, {
    nullable: true,
  })
  _avg!: PostAvgAggregate | null;

  @TypeGraphQL.Field((_type) => PostSumAggregate, {
    nullable: true,
  })
  _sum!: PostSumAggregate | null;

  @TypeGraphQL.Field((_type) => PostMinAggregate, {
    nullable: true,
  })
  _min!: PostMinAggregate | null;

  @TypeGraphQL.Field((_type) => PostMaxAggregate, {
    nullable: true,
  })
  _max!: PostMaxAggregate | null;
}
