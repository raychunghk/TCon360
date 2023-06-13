import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { CreateOneHolidayArgs } from './args/CreateOneHolidayArgs';
import { Holiday } from '../../../models/Holiday';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Holiday)
export class CreateOneHolidayResolver {
  @TypeGraphQL.Mutation((_returns) => Holiday, {
    nullable: false,
  })
  async createOneHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneHolidayArgs,
  ): Promise<Holiday> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
