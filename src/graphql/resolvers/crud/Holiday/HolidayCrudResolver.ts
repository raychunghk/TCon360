import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateHolidayArgs } from './args/AggregateHolidayArgs';
import { CreateOneHolidayArgs } from './args/CreateOneHolidayArgs';
import { DeleteManyHolidayArgs } from './args/DeleteManyHolidayArgs';
import { DeleteOneHolidayArgs } from './args/DeleteOneHolidayArgs';
import { FindFirstHolidayArgs } from './args/FindFirstHolidayArgs';
import { FindFirstHolidayOrThrowArgs } from './args/FindFirstHolidayOrThrowArgs';
import { FindManyHolidayArgs } from './args/FindManyHolidayArgs';
import { FindUniqueHolidayArgs } from './args/FindUniqueHolidayArgs';
import { FindUniqueHolidayOrThrowArgs } from './args/FindUniqueHolidayOrThrowArgs';
import { GroupByHolidayArgs } from './args/GroupByHolidayArgs';
import { UpdateManyHolidayArgs } from './args/UpdateManyHolidayArgs';
import { UpdateOneHolidayArgs } from './args/UpdateOneHolidayArgs';
import { UpsertOneHolidayArgs } from './args/UpsertOneHolidayArgs';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';
import { Holiday } from '../../../models/Holiday';
import { AffectedRowsOutput } from '../../outputs/AffectedRowsOutput';
import { AggregateHoliday } from '../../outputs/AggregateHoliday';
import { HolidayGroupBy } from '../../outputs/HolidayGroupBy';

@TypeGraphQL.Resolver((_of) => Holiday)
export class HolidayCrudResolver {
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

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyHolidayArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Holiday, {
    nullable: true,
  })
  async deleteOneHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneHolidayArgs,
  ): Promise<Holiday | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => Holiday, {
    nullable: true,
  })
  async findFirstHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstHolidayArgs,
  ): Promise<Holiday | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query((_returns) => [Holiday], {
    nullable: false,
  })
  async holidays(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyHolidayArgs,
  ): Promise<Holiday[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => Holiday, {
    nullable: true,
  })
  async holiday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueHolidayArgs,
  ): Promise<Holiday | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query((_returns) => [HolidayGroupBy], {
    nullable: false,
  })
  async groupByHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByHolidayArgs,
  ): Promise<HolidayGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyHolidayArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Holiday, {
    nullable: true,
  })
  async updateOneHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneHolidayArgs,
  ): Promise<Holiday | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Holiday, {
    nullable: false,
  })
  async upsertOneHoliday(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneHolidayArgs,
  ): Promise<Holiday> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).holiday.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
