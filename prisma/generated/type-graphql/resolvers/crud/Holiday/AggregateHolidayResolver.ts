import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateHolidayArgs } from './args/AggregateHolidayArgs';
import { Holiday } from '../../../models/Holiday';
import { AggregateHoliday } from '../../outputs/AggregateHoliday';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Holiday)
export class AggregateHolidayResolver {
  @TypeGraphQL.Query((_returns) => AggregateHoliday, {
    nullable: false,
  })
  async aggregateHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateHolidayArgs,
  ): Promise<AggregateHoliday> {
    return getPrismaFromContext(ctx).holiday.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
