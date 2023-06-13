import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstCalendarMasterOrThrowArgs } from './args/FindFirstCalendarMasterOrThrowArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class FindFirstCalendarMasterOrThrowResolver {
  @TypeGraphQL.Query((_returns) => CalendarMaster, {
    nullable: true,
  })
  async findFirstCalendarMasterOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstCalendarMasterOrThrowArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
