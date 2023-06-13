import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { UpsertOneCalendarMasterArgs } from './args/UpsertOneCalendarMasterArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class UpsertOneCalendarMasterResolver {
  @TypeGraphQL.Mutation((_returns) => CalendarMaster, {
    nullable: false,
  })
  async upsertOneCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneCalendarMasterArgs,
  ): Promise<CalendarMaster> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
