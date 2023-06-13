import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { CreateOneLeaveRequestArgs } from './args/CreateOneLeaveRequestArgs';
import { LeaveRequest } from '../../../models/LeaveRequest';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class CreateOneLeaveRequestResolver {
  @TypeGraphQL.Mutation((_returns) => LeaveRequest, {
    nullable: false,
  })
  async createOneLeaveRequest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneLeaveRequestArgs,
  ): Promise<LeaveRequest> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).leaveRequest.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
