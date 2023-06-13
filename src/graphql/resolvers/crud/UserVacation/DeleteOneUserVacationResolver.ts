import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { DeleteOneUserVacationArgs } from './args/DeleteOneUserVacationArgs';
import { UserVacation } from '../../../models/UserVacation';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => UserVacation)
export class DeleteOneUserVacationResolver {
  @TypeGraphQL.Mutation((_returns) => UserVacation, {
    nullable: true,
  })
  async deleteOneUserVacation(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneUserVacationArgs,
  ): Promise<UserVacation | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).userVacation.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
