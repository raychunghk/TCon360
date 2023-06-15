import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateTimeSheetCalendarArgs } from './args/AggregateTimeSheetCalendarArgs';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import { AggregateTimeSheetCalendar } from '../../outputs/AggregateTimeSheetCalendar';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class AggregateTimeSheetCalendarResolver {
  @TypeGraphQL.Query((_returns) => AggregateTimeSheetCalendar, {
    nullable: false,
  })
  async aggregateTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateTimeSheetCalendarArgs,
  ): Promise<AggregateTimeSheetCalendar> {
    return getPrismaFromContext(ctx).timeSheetCalendar.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
