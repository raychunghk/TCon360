import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestUpdateInput } from '../../../inputs/LeaveRequestUpdateInput';
import { LeaveRequestWhereUniqueInput } from '../../../inputs/LeaveRequestWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOneLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestUpdateInput, {
    nullable: false,
  })
  data!: LeaveRequestUpdateInput;

  @TypeGraphQL.Field((_type) => LeaveRequestWhereUniqueInput, {
    nullable: false,
  })
  where!: LeaveRequestWhereUniqueInput;
}
