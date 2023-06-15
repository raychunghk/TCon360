import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateCalendarMasterArgs } from './args/AggregateCalendarMasterArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import { AggregateCalendarMaster } from '../../outputs/AggregateCalendarMaster';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class AggregateCalendarMasterResolver {
  @TypeGraphQL.Query((_returns) => AggregateCalendarMaster, {
    nullable: false,
  })
  async aggregateCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateCalendarMasterArgs,
  ): Promise<AggregateCalendarMaster> {
    return getPrismaFromContext(ctx).calendarMaster.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
