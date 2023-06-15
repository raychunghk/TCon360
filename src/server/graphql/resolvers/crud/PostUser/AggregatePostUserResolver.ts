import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregatePostUserArgs } from './args/AggregatePostUserArgs';
import { PostUser } from '../../../models/PostUser';
import { AggregatePostUser } from '../../outputs/AggregatePostUser';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => PostUser)
export class AggregatePostUserResolver {
  @TypeGraphQL.Query((_returns) => AggregatePostUser, {
    nullable: false,
  })
  async aggregatePostUser(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregatePostUserArgs,
  ): Promise<AggregatePostUser> {
    return getPrismaFromContext(ctx).postUser.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
