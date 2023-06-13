import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateStaffArgs } from './args/AggregateStaffArgs';
import { Staff } from '../../../models/Staff';
import { AggregateStaff } from '../../outputs/AggregateStaff';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Staff)
export class AggregateStaffResolver {
  @TypeGraphQL.Query((_returns) => AggregateStaff, {
    nullable: false,
  })
  async aggregateStaff(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateStaffArgs,
  ): Promise<AggregateStaff> {
    return getPrismaFromContext(ctx).staff.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
