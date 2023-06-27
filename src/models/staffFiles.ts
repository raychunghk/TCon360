import { Field, ObjectType, Int } from 'type-graphql';
import { Staff } from './Staff';
import { LeaveRequest } from './LeaveRequest';

@ObjectType()
export class staffFiles {
  @Field((_type) => Int)
  id: number;

  @Field()
  filePath: string;

  @Field()
  fileType: string;

  @Field((_type) => Staff)
  staff: Staff;

  @Field((_type) => Int)
  staffId: number;

  @Field((_type) => [LeaveRequest])
  LeaveRequest: LeaveRequest[];

  // skip overwrite 👇
}
