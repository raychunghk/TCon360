import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestWhereInput } from '../../../inputs/LeaveRequestWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  where?: LeaveRequestWhereInput | undefined;
}
