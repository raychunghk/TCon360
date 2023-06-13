import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindFirstHolidayOrThrowArgs } from './args/FindFirstHolidayOrThrowArgs';
import { Holiday } from '../../../models/Holiday';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Holiday)
export class FindFirstHolidayOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Holiday, {
    nullable: true,
  })
  async findFirstHolidayOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstHolidayOrThrowArgs,
  ): Promise<Holiday | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
