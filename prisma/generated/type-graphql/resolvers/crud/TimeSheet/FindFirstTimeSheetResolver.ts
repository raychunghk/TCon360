import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstTimeSheetArgs } from './args/FindFirstTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class FindFirstTimeSheetResolver {
  @TypeGraphQL.Query((_returns) => TimeSheet, {
    nullable: true,
  })
  async findFirstTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
