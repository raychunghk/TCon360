import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindManyCalendarMasterArgs } from './args/FindManyCalendarMasterArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class FindManyCalendarMasterResolver {
  @TypeGraphQL.Query((_returns) => [CalendarMaster], {
    nullable: false,
  })
  async calendarMasters(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyCalendarMasterArgs,
  ): Promise<CalendarMaster[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
