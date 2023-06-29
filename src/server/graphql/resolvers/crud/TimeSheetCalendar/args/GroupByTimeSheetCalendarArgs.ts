import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarOrderByWithAggregationInput } from '../../../inputs/TimeSheetCalendarOrderByWithAggregationInput';
import { TimeSheetCalendarScalarWhereWithAggregatesInput } from '../../../inputs/TimeSheetCalendarScalarWhereWithAggregatesInput';
import { TimeSheetCalendarWhereInput } from '../../../inputs/TimeSheetCalendarWhereInput';
import { TimeSheetCalendarScalarFieldEnum } from '../../../../enums/TimeSheetCalendarScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  where?: TimeSheetCalendarWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [TimeSheetCalendarOrderByWithAggregationInput],
    {
      nullable: true,
    },
  )
  orderBy?: TimeSheetCalendarOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | 'id'
    | 'DayID'
    | 'CalendarDate'
    | 'TimeSheetID'
    | 'ChargeableDay'
    | 'ChargeableHour'
    | 'Training'
    | 'Vacation'
    | 'PublicHoliday'
    | 'WeekEnd'
    | 'Others'
  >;

  @TypeGraphQL.Field(
    (_type) => TimeSheetCalendarScalarWhereWithAggregatesInput,
    {
      nullable: true,
    },
  )
  having?: TimeSheetCalendarScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
