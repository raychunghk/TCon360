import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { TimeSheet } from '../../../models/TimeSheet';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class TimeSheetCalendarRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => TimeSheet, {
    nullable: false,
  })
  async timesheet(
    @TypeGraphQL.Root() timeSheetCalendar: TimeSheetCalendar,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<TimeSheet> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .timeSheetCalendar.findUniqueOrThrow({
        where: {
          id: timeSheetCalendar.id,
        },
      })
      .timesheet({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
