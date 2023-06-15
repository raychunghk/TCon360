import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateTimeSheetArgs } from './args/AggregateTimeSheetArgs';
import { TimeSheet } from '../../../models/TimeSheet';
import { AggregateTimeSheet } from '../../outputs/AggregateTimeSheet';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class AggregateTimeSheetResolver {
  @TypeGraphQL.Query((_returns) => AggregateTimeSheet, {
    nullable: false,
  })
  async aggregateTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateTimeSheetArgs,
  ): Promise<AggregateTimeSheet> {
    return getPrismaFromContext(ctx).timeSheet.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
