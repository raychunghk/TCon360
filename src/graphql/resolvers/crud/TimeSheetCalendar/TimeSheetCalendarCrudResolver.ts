import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateTimeSheetCalendarArgs } from './args/AggregateTimeSheetCalendarArgs';
import { CreateOneTimeSheetCalendarArgs } from './args/CreateOneTimeSheetCalendarArgs';
import { DeleteManyTimeSheetCalendarArgs } from './args/DeleteManyTimeSheetCalendarArgs';
import { DeleteOneTimeSheetCalendarArgs } from './args/DeleteOneTimeSheetCalendarArgs';
import { FindFirstTimeSheetCalendarArgs } from './args/FindFirstTimeSheetCalendarArgs';
import { FindFirstTimeSheetCalendarOrThrowArgs } from './args/FindFirstTimeSheetCalendarOrThrowArgs';
import { FindManyTimeSheetCalendarArgs } from './args/FindManyTimeSheetCalendarArgs';
import { FindUniqueTimeSheetCalendarArgs } from './args/FindUniqueTimeSheetCalendarArgs';
import { FindUniqueTimeSheetCalendarOrThrowArgs } from './args/FindUniqueTimeSheetCalendarOrThrowArgs';
import { GroupByTimeSheetCalendarArgs } from './args/GroupByTimeSheetCalendarArgs';
import { UpdateManyTimeSheetCalendarArgs } from './args/UpdateManyTimeSheetCalendarArgs';
import { UpdateOneTimeSheetCalendarArgs } from './args/UpdateOneTimeSheetCalendarArgs';
import { UpsertOneTimeSheetCalendarArgs } from './args/UpsertOneTimeSheetCalendarArgs';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';
import { TimeSheetCalendar } from '../../../models/TimeSheetCalendar';
import { AffectedRowsOutput } from '../../outputs/AffectedRowsOutput';
import { AggregateTimeSheetCalendar } from '../../outputs/AggregateTimeSheetCalendar';
import { TimeSheetCalendarGroupBy } from '../../outputs/TimeSheetCalendarGroupBy';

@TypeGraphQL.Resolver((_of) => TimeSheetCalendar)
export class TimeSheetCalendarCrudResolver {
  @TypeGraphQL.Query((_returns) => AggregateTimeSheetCalendar, {
    nullable: false,
  })
  async aggregateTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateTimeSheetCalendarArgs,
  ): Promise<AggregateTimeSheetCalendar> {
    return getPrismaFromContext(ctx).timeSheetCalendar.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheetCalendar, {
    nullable: false,
  })
  async createOneTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyTimeSheetCalendarArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async deleteOneTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async findFirstTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async findFirstTimeSheetCalendarOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstTimeSheetCalendarOrThrowArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [TimeSheetCalendar], {
    nullable: false,
  })
  async timeSheetCalendars(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async timeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async getTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTimeSheetCalendarOrThrowArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [TimeSheetCalendarGroupBy], {
    nullable: false,
  })
  async groupByTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendarGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.groupBy({
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
  async updateManyTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyTimeSheetCalendarArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheetCalendar, {
    nullable: true,
  })
  async updateOneTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => TimeSheetCalendar, {
    nullable: false,
  })
  async upsertOneTimeSheetCalendar(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneTimeSheetCalendarArgs,
  ): Promise<TimeSheetCalendar> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).timeSheetCalendar.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
