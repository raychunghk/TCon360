import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterOrderByWithRelationInput } from '../../../inputs/CalendarMasterOrderByWithRelationInput';
import { CalendarMasterWhereInput } from '../../../inputs/CalendarMasterWhereInput';
import { CalendarMasterWhereUniqueInput } from '../../../inputs/CalendarMasterWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateCalendarMasterArgs {
  @TypeGraphQL.Field((_type) => CalendarMasterWhereInput, {
    nullable: true,
  })
  where?: CalendarMasterWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [CalendarMasterOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: CalendarMasterOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => CalendarMasterWhereUniqueInput, {
    nullable: true,
  })
  cursor?: CalendarMasterWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
