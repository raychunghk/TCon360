import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { GroupByCalendarMasterArgs } from './args/GroupByCalendarMasterArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import { CalendarMasterGroupBy } from '../../outputs/CalendarMasterGroupBy';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class GroupByCalendarMasterResolver {
  @TypeGraphQL.Query((_returns) => [CalendarMasterGroupBy], {
    nullable: false,
  })
  async groupByCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByCalendarMasterArgs,
  ): Promise<CalendarMasterGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}
