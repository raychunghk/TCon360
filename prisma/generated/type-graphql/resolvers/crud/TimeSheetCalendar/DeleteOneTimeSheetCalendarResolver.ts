import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { DeleteOneTimeSheetCalendarArgs } from './args/DeleteOneTimeSheetCalendarArgs';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class DeleteOneTimeSheetCalendarResolver {
  @TypeGraphQL.Mutation((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async deleteOneTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
