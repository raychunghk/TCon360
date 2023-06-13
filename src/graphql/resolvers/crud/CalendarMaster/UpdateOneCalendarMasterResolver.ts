import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { UpdateOneCalendarMasterArgs } from './args/UpdateOneCalendarMasterArgs';
import { CalendarMaster } from '../../../models/CalendarMaster';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class UpdateOneCalendarMasterResolver {
  @TypeGraphQL.Mutation((_returns) => CalendarMaster, {
    nullable: true,
  })
  async updateOneCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneCalendarMasterArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
