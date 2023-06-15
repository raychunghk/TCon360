import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayUpdateInput } from '../../../inputs/HolidayUpdateInput';
import { HolidayWhereUniqueInput } from '../../../inputs/HolidayWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateOneHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayUpdateInput, {
    nullable: false,
  })
  data!: HolidayUpdateInput;

  @TypeGraphQL.Field((_type) => HolidayWhereUniqueInput, {
    nullable: false,
  })
  where!: HolidayWhereUniqueInput;
}
