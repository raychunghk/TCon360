import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstTimeSheetCalendarArgs } from './args/FindFirstTimeSheetCalendarArgs';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class FindFirstTimeSheetCalendarResolver {
  @TypeGraphQL.Query((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async findFirstTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
