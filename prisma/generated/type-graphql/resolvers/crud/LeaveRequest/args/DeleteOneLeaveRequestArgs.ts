import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { LeaveRequestWhereUniqueInput } from '../../../inputs/LeaveRequestWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class DeleteOneLeaveRequestArgs {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereUniqueInput, {
    nullable: false,
  })
  where!: LeaveRequestWhereUniqueInput;
}
