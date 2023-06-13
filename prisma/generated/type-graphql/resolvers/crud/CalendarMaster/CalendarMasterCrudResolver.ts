import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { AggregateCalendarMasterArgs } from './args/AggregateCalendarMasterArgs';
import { CreateOneCalendarMasterArgs } from './args/CreateOneCalendarMasterArgs';
import { DeleteManyCalendarMasterArgs } from './args/DeleteManyCalendarMasterArgs';
import { DeleteOneCalendarMasterArgs } from './args/DeleteOneCalendarMasterArgs';
import { FindFirstCalendarMasterArgs } from './args/FindFirstCalendarMasterArgs';
import { FindFirstCalendarMasterOrThrowArgs } from './args/FindFirstCalendarMasterOrThrowArgs';
import { FindManyCalendarMasterArgs } from './args/FindManyCalendarMasterArgs';
import { FindUniqueCalendarMasterArgs } from './args/FindUniqueCalendarMasterArgs';
import { FindUniqueCalendarMasterOrThrowArgs } from './args/FindUniqueCalendarMasterOrThrowArgs';
import { GroupByCalendarMasterArgs } from './args/GroupByCalendarMasterArgs';
import { UpdateManyCalendarMasterArgs } from './args/UpdateManyCalendarMasterArgs';
import { UpdateOneCalendarMasterArgs } from './args/UpdateOneCalendarMasterArgs';
import { UpsertOneCalendarMasterArgs } from './args/UpsertOneCalendarMasterArgs';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';
import { CalendarMaster } from '../../../models/CalendarMaster';
import { AffectedRowsOutput } from '../../outputs/AffectedRowsOutput';
import { AggregateCalendarMaster } from '../../outputs/AggregateCalendarMaster';
import { CalendarMasterGroupBy } from '../../outputs/CalendarMasterGroupBy';

@TypeGraphQL.Resolver((_of) => CalendarMaster)
export class CalendarMasterCrudResolver {
  @TypeGraphQL.Query((_returns) => AggregateCalendarMaster, {
    nullable: false,
  })
  async aggregateCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateCalendarMasterArgs,
  ): Promise<AggregateCalendarMaster> {
    return getPrismaFromContext(ctx).calendarMaster.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation((_returns) => CalendarMaster, {
    nullable: false,
  })
  async createOneCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneCalendarMasterArgs,
  ): Promise<CalendarMaster> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyCalendarMasterArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => CalendarMaster, {
    nullable: true,
  })
  async deleteOneCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneCalendarMasterArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => CalendarMaster, {
    nullable: true,
  })
  async findFirstCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstCalendarMasterArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => CalendarMaster, {
    nullable: true,
  })
  async findFirstCalendarMasterOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstCalendarMasterOrThrowArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [CalendarMaster], {
    nullable: false,
  })
  async calendarMasters(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyCalendarMasterArgs,
  ): Promise<CalendarMaster[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => CalendarMaster, {
    nullable: true,
  })
  async calendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueCalendarMasterArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => CalendarMaster, {
    nullable: true,
  })
  async getCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueCalendarMasterOrThrowArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [CalendarMasterGroupBy], {
    nullable: false,
  })
  async groupByCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByCalendarMasterArgs,
  ): Promise<CalendarMasterGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.groupBy({
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
  async updateManyCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyCalendarMasterArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => CalendarMaster, {
    nullable: true,
  })
  async updateOneCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneCalendarMasterArgs,
  ): Promise<CalendarMaster | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => CalendarMaster, {
    nullable: false,
  })
  async upsertOneCalendarMaster(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneCalendarMasterArgs,
  ): Promise<CalendarMaster> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).calendarMaster.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
