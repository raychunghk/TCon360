import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { StaffCreateInput } from '../../../inputs/StaffCreateInput';
import { StaffUpdateInput } from '../../../inputs/StaffUpdateInput';
import { StaffWhereUniqueInput } from '../../../inputs/StaffWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneStaffArgs {
  @TypeGraphQL.Field((_type) => StaffWhereUniqueInput, {
    nullable: false,
  })
  where!: StaffWhereUniqueInput;

  @TypeGraphQL.Field((_type) => StaffCreateInput, {
    nullable: false,
  })
  create!: StaffCreateInput;

  @TypeGraphQL.Field((_type) => StaffUpdateInput, {
    nullable: false,
  })
  update!: StaffUpdateInput;
}
