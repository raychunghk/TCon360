import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayWhereInput } from '../../../inputs/HolidayWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayWhereInput, {
    nullable: true,
  })
  where?: HolidayWhereInput | undefined;
}
