import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { UpsertOneLeaveRequestArgs } from './args/UpsertOneLeaveRequestArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class UpsertOneLeaveRequestResolver {
  @TypeGraphQL.Mutation((_returns) => LeaveRequest, {
    nullable: false,
  })
  async upsertOneLeaveRequest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneLeaveRequestArgs,
  ): Promise<LeaveRequest> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).leaveRequest.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
