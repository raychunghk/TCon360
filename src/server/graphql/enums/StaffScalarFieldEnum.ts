import * as TypeGraphQL from 'type-graphql';

export enum StaffScalarFieldEnum {
  id = 'id',
  StaffName = 'StaffName',
  AgentName = 'AgentName',
  StaffCategory = 'StaffCategory',
  Department = 'Department',
  PostUnit = 'PostUnit',
  ManagerName = 'ManagerName',
  ManagerTitle = 'ManagerTitle',
  ManagerEmail = 'ManagerEmail',
}
TypeGraphQL.registerEnumType(StaffScalarFieldEnum, {
  name: 'StaffScalarFieldEnum',
  description: undefined,
});
