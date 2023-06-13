import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { LeaveRequest } from '../../../models/LeaveRequest';
import { Staff } from '../../../models/Staff';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => LeaveRequest)
export class LeaveRequestRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Staff, {
    nullable: false,
  })
  async staff(
    @TypeGraphQL.Root() leaveRequest: LeaveRequest,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<Staff> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .leaveRequest.findUniqueOrThrow({
        where: {
          id: leaveRequest.id,
        },
      })
      .staff({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
