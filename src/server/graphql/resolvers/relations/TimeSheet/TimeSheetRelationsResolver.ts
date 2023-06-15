import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { TimeSheet } from '../../../models/TimeSheet';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import { TimeSheetCalendarArgs } from './args/TimeSheetCalendarArgs';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class TimeSheetRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [TimeSheetCalendar], {
    nullable: false,
  })
  async calendar(
    @TypeGraphQL.Root() timeSheet: TimeSheet,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: TimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .timeSheet.findUniqueOrThrow({
        where: {
          id: timeSheet.id,
        },
      })
      .calendar({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
