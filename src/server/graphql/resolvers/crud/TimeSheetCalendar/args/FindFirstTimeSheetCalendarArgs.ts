import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetCalendarOrderByWithRelationInput } from '../../../inputs/TimeSheetCalendarOrderByWithRelationInput';
import { TimeSheetCalendarWhereInput } from '../../../inputs/TimeSheetCalendarWhereInput';
import { TimeSheetCalendarWhereUniqueInput } from '../../../inputs/TimeSheetCalendarWhereUniqueInput';
import { TimeSheetCalendarScalarFieldEnum } from '../../../../enums/TimeSheetCalendarScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindFirstTimeSheetCalendarArgs {
  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereInput, {
    nullable: true,
  })
  where?: TimeSheetCalendarWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: TimeSheetCalendarOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetCalendarWhereUniqueInput, {
    nullable: true,
  })
  cursor?: TimeSheetCalendarWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetCalendarScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | 'id'
        | 'DayID'
        | 'CalendarDate'
        | 'TimeSheetID'
        | 'ChargeableDay'
        | 'ChargeableHour'
        | 'Traing'
        | 'Vacation'
        | 'PublicHoliday'
        | 'WeekEnd'
        | 'Others'
      >
    | undefined;
}
