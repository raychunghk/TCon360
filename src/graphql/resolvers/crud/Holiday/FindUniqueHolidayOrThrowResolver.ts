import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindUniqueHolidayOrThrowArgs } from './args/FindUniqueHolidayOrThrowArgs';
import { Holiday } from '../../../models/Holiday';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Holiday)
export class FindUniqueHolidayOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Holiday, {
    nullable: true,
  })
  async getHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueHolidayOrThrowArgs,
  ): Promise<Holiday | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
