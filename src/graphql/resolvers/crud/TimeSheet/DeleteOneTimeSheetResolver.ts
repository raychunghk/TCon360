import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { DeleteOneTimeSheetArgs } from './args/DeleteOneTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class DeleteOneTimeSheetResolver {
  @TypeGraphQL.Mutation((_returns) => TimeSheet, {
    nullable: true,
  })
  async deleteOneTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
