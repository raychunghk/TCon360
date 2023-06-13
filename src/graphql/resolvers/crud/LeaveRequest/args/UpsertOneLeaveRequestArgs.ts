import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestCreateInput } from '../../../inputs/LeaveRequestCreateInput';
import { LeaveRequestUpdateInput } from '../../../inputs/LeaveRequestUpdateInput';
import { LeaveRequestWhereUniqueInput } from '../../../inputs/LeaveRequestWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereUniqueInput, {
    nullable: false,
  })
  where!: LeaveRequestWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LeaveRequestCreateInput, {
    nullable: false,
  })
  create!: LeaveRequestCreateInput;

  @TypeGraphQL.Field((_type) => LeaveRequestUpdateInput, {
    nullable: false,
  })
  update!: LeaveRequestUpdateInput;
}
