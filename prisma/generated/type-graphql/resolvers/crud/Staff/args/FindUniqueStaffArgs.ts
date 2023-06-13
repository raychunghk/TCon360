import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { StaffWhereUniqueInput } from '../../../inputs/StaffWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueStaffArgs {
  @TypeGraphQL.Field((_type) => StaffWhereUniqueInput, {
    nullable: false,
  })
  where!: StaffWhereUniqueInput;
}
