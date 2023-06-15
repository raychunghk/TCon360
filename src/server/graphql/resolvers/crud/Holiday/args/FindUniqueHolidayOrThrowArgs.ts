import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayWhereUniqueInput } from '../../../inputs/HolidayWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueHolidayOrThrowArgs {
  @TypeGraphQL.Field((_type) => HolidayWhereUniqueInput, {
    nullable: false,
  })
  where!: HolidayWhereUniqueInput;
}
