import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestCreateInput } from '../../../inputs/LeaveRequestCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOneLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestCreateInput, {
    nullable: false,
  })
  data!: LeaveRequestCreateInput;
}
