import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { GroupByTimeSheetArgs } from './args/GroupByTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import { TimeSheetGroupBy } from '../../outputs/TimeSheetGroupBy';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class GroupByTimeSheetResolver {
  @TypeGraphQL.Query((_returns) => [TimeSheetGroupBy], {
    nullable: false,
  })
  async groupByTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByTimeSheetArgs,
  ): Promise<TimeSheetGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}
