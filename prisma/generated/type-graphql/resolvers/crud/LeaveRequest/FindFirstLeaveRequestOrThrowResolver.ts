import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstLeaveRequestOrThrowArgs } from './args/FindFirstLeaveRequestOrThrowArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class FindFirstLeaveRequestOrThrowResolver {
  @TypeGraphQL.Query((_returns) => LeaveRequest, {
    nullable: true,
  })
  async findFirstLeaveRequestOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstLeaveRequestOrThrowArgs,
  ): Promise<LeaveRequest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).leaveRequest.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
