import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayUpdateManyMutationInput } from '../../../inputs/HolidayUpdateManyMutationInput';
import { HolidayWhereInput } from '../../../inputs/HolidayWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayUpdateManyMutationInput, {
    nullable: false,
  })
  data!: HolidayUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => HolidayWhereInput, {
    nullable: true,
  })
  where?: HolidayWhereInput | undefined;
}
