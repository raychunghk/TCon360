import * as TypeGraphQL from 'type-graphql';

export enum TimeSheetCalendarScalarFieldEnum {
  id = 'id',
  DayID = 'DayID',
  CalendarDate = 'CalendarDate',
  TimeSheetID = 'TimeSheetID',
  ChargeableDay = 'ChargeableDay',
  ChargeableHour = 'ChargeableHour',
  Traing = 'Traing',
  Vacation = 'Vacation',
  PublicHoliday = 'PublicHoliday',
  WeekEnd = 'WeekEnd',
  Others = 'Others',
}
TypeGraphQL.registerEnumType(TimeSheetCalendarScalarFieldEnum, {
  name: 'TimeSheetCalendarScalarFieldEnum',
  description: undefined,
});
