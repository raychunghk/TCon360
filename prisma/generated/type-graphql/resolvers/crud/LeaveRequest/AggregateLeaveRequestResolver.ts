import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateLeaveRequestArgs } from './args/AggregateLeaveRequestArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { AggregateLeaveRequest } from '../../outputs/AggregateLeaveRequest';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class AggregateLeaveRequestResolver {
  @TypeGraphQL.Query((_returns) => AggregateLeaveRequest, {
    nullable: false,
  })
  async aggregateLeaveRequest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateLeaveRequestArgs,
  ): Promise<AggregateLeaveRequest> {
    return getPrismaFromContext(ctx).leaveRequest.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
