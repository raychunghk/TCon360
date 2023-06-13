import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestOrderByWithRelationInput } from '../../../inputs/LeaveRequestOrderByWithRelationInput';
import { LeaveRequestWhereInput } from '../../../inputs/LeaveRequestWhereInput';
import { LeaveRequestWhereUniqueInput } from '../../../inputs/LeaveRequestWhereUniqueInput';
import { LeaveRequestScalarFieldEnum } from '../../../../enums/LeaveRequestScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class StaffLeaveRequestsArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  where?: LeaveRequestWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: LeaveRequestOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestWhereUniqueInput, {
    nullable: true,
  })
  cursor?: LeaveRequestWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | 'id'
        | 'leavePeriodStart'
        | 'AMPMStart'
        | 'leavePeriodEnd'
        | 'AMPMEnd'
        | 'leaveDays'
        | 'dateOfReturn'
        | 'staffSignDate'
        | 'staffId'
      >
    | undefined;
}
