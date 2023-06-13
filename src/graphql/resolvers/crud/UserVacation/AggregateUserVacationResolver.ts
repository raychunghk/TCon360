import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateUserVacationArgs } from './args/AggregateUserVacationArgs';
import { UserVacation } from '../../../models/UserVacation';
import { AggregateUserVacation } from '../../outputs/AggregateUserVacation';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => UserVacation)
export class AggregateUserVacationResolver {
  @TypeGraphQL.Query((_returns) => AggregateUserVacation, {
    nullable: false,
  })
  async aggregateUserVacation(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateUserVacationArgs,
  ): Promise<AggregateUserVacation> {
    return getPrismaFromContext(ctx).userVacation.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
