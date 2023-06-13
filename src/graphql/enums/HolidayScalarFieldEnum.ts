import * as TypeGraphQL from 'type-graphql';

export enum HolidayScalarFieldEnum {
  StartDate = 'StartDate',
  EndDate = 'EndDate',
  Summary = 'Summary',
}
TypeGraphQL.registerEnumType(HolidayScalarFieldEnum, {
  name: 'HolidayScalarFieldEnum',
  description: undefined,
});
