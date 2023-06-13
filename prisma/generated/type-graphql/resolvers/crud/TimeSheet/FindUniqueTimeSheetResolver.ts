import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindUniqueTimeSheetArgs } from './args/FindUniqueTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class FindUniqueTimeSheetResolver {
  @TypeGraphQL.Query((_returns) => TimeSheet, {
    nullable: true,
  })
  async timeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
