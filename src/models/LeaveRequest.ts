import { Field, ObjectType, Int, Float, InputType } from 'type-graphql';
import { Staff } from './Staff';

@ObjectType()
@InputType()
export class LeaveRequest {
  @Field((_type) => Int)
  id: number;

  @Field()
  leavePeriodStart: Date;

  @Field({ nullable: true })
  AMPMStart?: string;

  @Field()
  leavePeriodEnd: Date;

  @Field({ nullable: true })
  AMPMEnd?: string;

  @Field((_type) => Float)
  leaveDays: number;

  @Field()
  dateOfReturn: Date;

  @Field()
  staffSignDate: Date;

  @Field((_type) => Int)
  staffId: number;

  @Field((_type) => Staff)
  staff?: Staff;

  // skip overwrite 👇
}
