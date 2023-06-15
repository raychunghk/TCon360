import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestUpdateManyMutationInput } from '../../../inputs/LeaveRequestUpdateManyMutationInput';
import { LeaveRequestWhereInput } from '../../../inputs/LeaveRequestWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestUpdateManyMutationInput, {
    nullable: false,
  })
  data!: LeaveRequestUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  where?: LeaveRequestWhereInput | undefined;
}
