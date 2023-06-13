import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayWhereUniqueInput } from '../../../inputs/HolidayWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class DeleteOneHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayWhereUniqueInput, {
    nullable: false,
  })
  where!: HolidayWhereUniqueInput;
}
