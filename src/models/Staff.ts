import { Field, ObjectType, Int } from 'type-graphql';
import { LeaveRequest } from './LeaveRequest';

@ObjectType()
export class Staff {
  @Field((_type) => Int)
  id: number;

  @Field()
  StaffName: string;

  @Field()
  AgentName: string;

  @Field()
  StaffCategory: string;

  @Field()
  Department: string;

  @Field()
  PostUnit: string;

  @Field()
  ManagerName: string;

  @Field()
  ManagerTitle: string;

  @Field()
  ManagerEmail: string;

  @Field((_type) => [LeaveRequest])
  leaveRequests: LeaveRequest[];

  // skip overwrite 👇
}
