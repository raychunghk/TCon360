import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetOrderByWithAggregationInput } from '../../../inputs/TimeSheetOrderByWithAggregationInput';
import { TimeSheetScalarWhereWithAggregatesInput } from '../../../inputs/TimeSheetScalarWhereWithAggregatesInput';
import { TimeSheetWhereInput } from '../../../inputs/TimeSheetWhereInput';
import { TimeSheetScalarFieldEnum } from '../../../../enums/TimeSheetScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByTimeSheetArgs {
  @TypeGraphQL.Field((_type) => TimeSheetWhereInput, {
    nullable: true,
  })
  where?: TimeSheetWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: TimeSheetOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | 'id'
    | 'StartDate'
    | 'EndDate'
    | 'TSCalendarID'
    | 'TimeSheetFileName'
    | 'TotalChargeableDay'
    | 'TotalChargeableHour'
    | 'TotalOTHour'
  >;

  @TypeGraphQL.Field((_type) => TimeSheetScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: TimeSheetScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
