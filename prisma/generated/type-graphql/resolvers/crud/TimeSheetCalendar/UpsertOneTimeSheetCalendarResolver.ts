import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { UpsertOneTimeSheetCalendarArgs } from './args/UpsertOneTimeSheetCalendarArgs';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class UpsertOneTimeSheetCalendarResolver {
  @TypeGraphQL.Mutation((_returns) => TimeSheetCalendar, {
    nullable: false,
  })
  async upsertOneTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
