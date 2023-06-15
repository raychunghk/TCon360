import * as TypeGraphQL from 'type-graphql';

export enum CalendarMasterScalarFieldEnum {
  CalendarDate = 'CalendarDate',
  WeekDayName = 'WeekDayName',
  Year = 'Year',
  Month = 'Month',
}
TypeGraphQL.registerEnumType(CalendarMasterScalarFieldEnum, {
  name: 'CalendarMasterScalarFieldEnum',
  description: undefined,
});
