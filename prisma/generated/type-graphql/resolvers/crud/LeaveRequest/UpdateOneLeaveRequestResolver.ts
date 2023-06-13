import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { UpdateOneLeaveRequestArgs } from './args/UpdateOneLeaveRequestArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class UpdateOneLeaveRequestResolver {
  @TypeGraphQL.Mutation((_returns) => LeaveRequest, {
    nullable: true,
  })
  async updateOneLeaveRequest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneLeaveRequestArgs,
  ): Promise<LeaveRequest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).leaveRequest.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
