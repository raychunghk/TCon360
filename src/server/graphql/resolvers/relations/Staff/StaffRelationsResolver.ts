import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { Staff } from '../../../models/Staff';
import { StaffLeaveRequestsArgs } from './args/StaffLeaveRequestsArgs';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Staff)
export class StaffRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [LeaveRequest], {
    nullable: false,
  })
  async leaveRequests(
    @TypeGraphQL.Root() staff: Staff,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: StaffLeaveRequestsArgs,
  ): Promise<LeaveRequest[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .staff.findUniqueOrThrow({
        where: {
          id: staff.id,
        },
      })
      .leaveRequests({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
