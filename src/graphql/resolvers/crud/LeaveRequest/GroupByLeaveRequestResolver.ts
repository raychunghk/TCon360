import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { GroupByLeaveRequestArgs } from './args/GroupByLeaveRequestArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { LeaveRequestGroupBy } from '../../outputs/LeaveRequestGroupBy';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class GroupByLeaveRequestResolver {
  @TypeGraphQL.Query((_returns) => [LeaveRequestGroupBy], {
    nullable: false,
  })
  async groupByLeaveRequest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByLeaveRequestArgs,
  ): Promise<LeaveRequestGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).leaveRequest.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}
