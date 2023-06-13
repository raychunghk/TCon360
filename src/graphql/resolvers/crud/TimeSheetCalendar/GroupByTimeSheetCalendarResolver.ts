import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { GroupByTimeSheetCalendarArgs } from './args/GroupByTimeSheetCalendarArgs';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import { TimeSheetCalendarGroupBy } from '../../outputs/TimeSheetCalendarGroupBy';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class GroupByTimeSheetCalendarResolver {
  @TypeGraphQL.Query((_returns) => [TimeSheetCalendarGroupBy], {
    nullable: false,
  })
  async groupByTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendarGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}
