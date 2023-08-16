import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class viewEvents {
  @Field((_type) => Int)
  ID: number;

  @Field()
  leavePeriodStart: Date;

  @Field({ nullable: true })
  leavePeriodEnd?: Date;

  @Field()
  StartDateStr: string;

  @Field()
  WeekDayName: string;

  @Field((_type) => Int)
  Year: number;

  @Field((_type) => Int)
  Month: number;

  @Field({ nullable: true })
  HolidaySummary?: string;

  @Field({ nullable: true })
  EndDateStr?: string;

  @Field({ nullable: true })
  dateOfReturn?: Date;

  @Field({ nullable: true })
  ReturnDateStr?: string;

  @Field({ nullable: true })
  AMPMStart?: string;

  @Field({ nullable: true })
  AMPMEnd?: string;

  @Field((_type) => Int, { nullable: true })
  staffId?: number;

  @Field({ nullable: true })
  leaveType?: string;

  @Field((_type) => Int, { nullable: true })
  LeaveRequestId?: number;

  // skip overwrite 👇
}
