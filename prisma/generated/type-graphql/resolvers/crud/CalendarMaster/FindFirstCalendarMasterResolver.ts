import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstCalendarMasterArgs } from './args/FindFirstCalendarMasterArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class FindFirstCalendarMasterResolver {
  @TypeGraphQL.Query((_returns) => CalendarMaster, {
    nullable: true,
  })
  async findFirstCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstCalendarMasterArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
