import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { CalendarMasterOrderByWithRelationInput } from '../../../inputs/CalendarMasterOrderByWithRelationInput';
import { CalendarMasterWhereInput } from '../../../inputs/CalendarMasterWhereInput';
import { CalendarMasterWhereUniqueInput } from '../../../inputs/CalendarMasterWhereUniqueInput';
import { CalendarMasterScalarFieldEnum } from '../../../../enums/CalendarMasterScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindManyCalendarMasterArgs {
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

  @TypeGraphQL.Field((_type) => [CalendarMasterScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<'CalendarDate' | 'WeekDayName' | 'Year' | 'Month'>
    | undefined;
}
