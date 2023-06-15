import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarOrderByWithRelationInput } from '../../../inputs/TimeSheetCalendarOrderByWithRelationInput';
import { TimeSheetCalendarWhereInput } from '../../../inputs/TimeSheetCalendarWhereInput';
import { TimeSheetCalendarWhereUniqueInput } from '../../../inputs/TimeSheetCalendarWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  where?: TimeSheetCalendarWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: TimeSheetCalendarOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: true,
  })
  cursor?: TimeSheetCalendarWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
