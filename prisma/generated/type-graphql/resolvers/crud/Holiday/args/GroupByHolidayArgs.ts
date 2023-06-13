import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayOrderByWithAggregationInput } from '../../../inputs/HolidayOrderByWithAggregationInput';
import { HolidayScalarWhereWithAggregatesInput } from '../../../inputs/HolidayScalarWhereWithAggregatesInput';
import { HolidayWhereInput } from '../../../inputs/HolidayWhereInput';
import { HolidayScalarFieldEnum } from '../../../../enums/HolidayScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayWhereInput, {
    nullable: true,
  })
  where?: HolidayWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [HolidayOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: HolidayOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [HolidayScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<'StartDate' | 'EndDate' | 'Summary'>;

  @TypeGraphQL.Field((_type) => HolidayScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: HolidayScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
