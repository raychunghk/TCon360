import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterOrderByWithAggregationInput } from '../../../inputs/CalendarMasterOrderByWithAggregationInput';
import { CalendarMasterScalarWhereWithAggregatesInput } from '../../../inputs/CalendarMasterScalarWhereWithAggregatesInput';
import { CalendarMasterWhereInput } from '../../../inputs/CalendarMasterWhereInput';
import { CalendarMasterScalarFieldEnum } from '../../../../enums/CalendarMasterScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterWhereInput, {
    nullable: true,
  })
  where?: CalendarMasterWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [CalendarMasterOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: CalendarMasterOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [CalendarMasterScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<'CalendarDate' | 'WeekDayName' | 'Year' | 'Month'>;

  @TypeGraphQL.Field((_type) => CalendarMasterScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: CalendarMasterScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
