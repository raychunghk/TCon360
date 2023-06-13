import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstUserVacationArgs } from './args/FindFirstUserVacationArgs';
import { UserVacation } from '../../../models/UserVacation';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => UserVacation)
export class FindFirstUserVacationResolver {
  @TypeGraphQL.Query((_returns) => UserVacation, {
    nullable: true,
  })
  async findFirstUserVacation(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstUserVacationArgs,
  ): Promise<UserVacation | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).userVacation.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
