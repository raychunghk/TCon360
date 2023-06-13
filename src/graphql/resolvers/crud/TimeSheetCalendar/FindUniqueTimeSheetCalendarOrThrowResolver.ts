import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindUniqueTimeSheetCalendarOrThrowArgs } from './args/FindUniqueTimeSheetCalendarOrThrowArgs';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class FindUniqueTimeSheetCalendarOrThrowResolver {
  @TypeGraphQL.Query((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async getTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTimeSheetCalendarOrThrowArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
