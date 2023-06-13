import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindUniqueLeaveRequestOrThrowArgs } from './args/FindUniqueLeaveRequestOrThrowArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class FindUniqueLeaveRequestOrThrowResolver {
  @TypeGraphQL.Query((_returns) => LeaveRequest, {
    nullable: true,
  })
  async getLeaveRequest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueLeaveRequestOrThrowArgs,
  ): Promise<LeaveRequest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).leaveRequest.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
