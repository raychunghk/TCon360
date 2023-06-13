import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindManyTimeSheetArgs } from './args/FindManyTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class FindManyTimeSheetResolver {
  @TypeGraphQL.Query((_returns) => [TimeSheet], {
    nullable: false,
  })
  async timeSheets(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyTimeSheetArgs,
  ): Promise<TimeSheet[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
