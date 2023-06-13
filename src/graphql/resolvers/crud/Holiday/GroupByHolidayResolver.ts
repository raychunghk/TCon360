import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { GroupByHolidayArgs } from './args/GroupByHolidayArgs';
import { Holiday } from '../../../models/Holiday';
import { HolidayGroupBy } from '../../outputs/HolidayGroupBy';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Holiday)
export class GroupByHolidayResolver {
  @TypeGraphQL.Query((_returns) => [HolidayGroupBy], {
    nullable: false,
  })
  async groupByHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByHolidayArgs,
  ): Promise<HolidayGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}
