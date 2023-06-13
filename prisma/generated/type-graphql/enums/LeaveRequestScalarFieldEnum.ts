import * as TypeGraphQL from 'type-graphql';

export enum LeaveRequestScalarFieldEnum {
  id = 'id',
  leavePeriodStart = 'leavePeriodStart',
  AMPMStart = 'AMPMStart',
  leavePeriodEnd = 'leavePeriodEnd',
  AMPMEnd = 'AMPMEnd',
  leaveDays = 'leaveDays',
  dateOfReturn = 'dateOfReturn',
  staffSignDate = 'staffSignDate',
  staffId = 'staffId',
}
TypeGraphQL.registerEnumType(LeaveRequestScalarFieldEnum, {
  name: 'LeaveRequestScalarFieldEnum',
  description: undefined,
});
