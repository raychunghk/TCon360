import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayCreateInput } from '../../../inputs/HolidayCreateInput';
import { HolidayUpdateInput } from '../../../inputs/HolidayUpdateInput';
import { HolidayWhereUniqueInput } from '../../../inputs/HolidayWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertOneHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayWhereUniqueInput, {
    nullable: false,
  })
  where!: HolidayWhereUniqueInput;

  @TypeGraphQL.Field((_type) => HolidayCreateInput, {
    nullable: false,
  })
  create!: HolidayCreateInput;

  @TypeGraphQL.Field((_type) => HolidayUpdateInput, {
    nullable: false,
  })
  update!: HolidayUpdateInput;
}
