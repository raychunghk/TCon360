import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindUniqueUserVacationOrThrowArgs } from './args/FindUniqueUserVacationOrThrowArgs';
import { UserVacation } from '../../../models/UserVacation';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => UserVacation)
export class FindUniqueUserVacationOrThrowResolver {
  @TypeGraphQL.Query((_returns) => UserVacation, {
    nullable: true,
  })
  async getUserVacation(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueUserVacationOrThrowArgs,
  ): Promise<UserVacation | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).userVacation.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
