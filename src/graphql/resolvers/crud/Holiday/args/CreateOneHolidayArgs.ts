import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayCreateInput } from '../../../inputs/HolidayCreateInput';

@TypeGraphQL.ArgsType()
export class CreateOneHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayCreateInput, {
    nullable: false,
  })
  data!: HolidayCreateInput;
}
