import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { HolidayOrderByWithRelationInput } from '../../../inputs/HolidayOrderByWithRelationInput';
import { HolidayWhereInput } from '../../../inputs/HolidayWhereInput';
import { HolidayWhereUniqueInput } from '../../../inputs/HolidayWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateHolidayArgs {
  @TypeGraphQL.Field((_type) => HolidayWhereInput, {
    nullable: true,
  })
  where?: HolidayWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [HolidayOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: HolidayOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => HolidayWhereUniqueInput, {
    nullable: true,
  })
  cursor?: HolidayWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
