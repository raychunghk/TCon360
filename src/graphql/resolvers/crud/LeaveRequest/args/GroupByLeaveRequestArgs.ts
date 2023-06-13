import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestOrderByWithAggregationInput } from '../../../inputs/LeaveRequestOrderByWithAggregationInput';
import { LeaveRequestScalarWhereWithAggregatesInput } from '../../../inputs/LeaveRequestScalarWhereWithAggregatesInput';
import { LeaveRequestWhereInput } from '../../../inputs/LeaveRequestWhereInput';
import { LeaveRequestScalarFieldEnum } from '../../../../enums/LeaveRequestScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  where?: LeaveRequestWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: LeaveRequestOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | 'id'
    | 'leavePeriodStart'
    | 'AMPMStart'
    | 'leavePeriodEnd'
    | 'AMPMEnd'
    | 'leaveDays'
    | 'dateOfReturn'
    | 'staffSignDate'
    | 'staffId'
  >;

  @TypeGraphQL.Field((_type) => LeaveRequestScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: LeaveRequestScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
