import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { CreateOneTimeSheetArgs } from './args/CreateOneTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class CreateOneTimeSheetResolver {
  @TypeGraphQL.Mutation((_returns) => TimeSheet, {
    nullable: false,
  })
  async createOneTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneTimeSheetArgs,
  ): Promise<TimeSheet> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
