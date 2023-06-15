import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateTimeSheetArgs } from './args/AggregateTimeSheetArgs';
import { CreateOneTimeSheetArgs } from './args/CreateOneTimeSheetArgs';
import { DeleteManyTimeSheetArgs } from './args/DeleteManyTimeSheetArgs';
import { DeleteOneTimeSheetArgs } from './args/DeleteOneTimeSheetArgs';
import { FindFirstTimeSheetArgs } from './args/FindFirstTimeSheetArgs';
import { FindFirstTimeSheetOrThrowArgs } from './args/FindFirstTimeSheetOrThrowArgs';
import { FindManyTimeSheetArgs } from './args/FindManyTimeSheetArgs';
import { FindUniqueTimeSheetArgs } from './args/FindUniqueTimeSheetArgs';
import { FindUniqueTimeSheetOrThrowArgs } from './args/FindUniqueTimeSheetOrThrowArgs';
import { GroupByTimeSheetArgs } from './args/GroupByTimeSheetArgs';
import { UpdateManyTimeSheetArgs } from './args/UpdateManyTimeSheetArgs';
import { UpdateOneTimeSheetArgs } from './args/UpdateOneTimeSheetArgs';
import { UpsertOneTimeSheetArgs } from './args/UpsertOneTimeSheetArgs';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';
import { TimeSheet } from '../../../models/TimeSheet';
import { AffectedRowsOutput } from '../../outputs/AffectedRowsOutput';
import { AggregateTimeSheet } from '../../outputs/AggregateTimeSheet';
import { TimeSheetGroupBy } from '../../outputs/TimeSheetGroupBy';

@TypeGraphQL.Resolver((_of) => TimeSheet)
export class TimeSheetCrudResolver {
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

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyTimeSheetArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheet, {
    nullable: true,
  })
  async deleteOneTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheet, {
    nullable: true,
  })
  async findFirstTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheet, {
    nullable: true,
  })
  async findFirstTimeSheetOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstTimeSheetOrThrowArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query((_returns) => TimeSheet, {
    nullable: true,
  })
  async timeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheet, {
    nullable: true,
  })
  async getTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTimeSheetOrThrowArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [TimeSheetGroupBy], {
    nullable: false,
  })
  async groupByTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByTimeSheetArgs,
  ): Promise<TimeSheetGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.groupBy({
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
  async updateManyTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyTimeSheetArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheet, {
    nullable: true,
  })
  async updateOneTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneTimeSheetArgs,
  ): Promise<TimeSheet | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheet, {
    nullable: false,
  })
  async upsertOneTimeSheet(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneTimeSheetArgs,
  ): Promise<TimeSheet> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheet.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
