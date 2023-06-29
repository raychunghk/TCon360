import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { CalendarVacation } from '../models/CalendarVacation';
import { Staff } from '../models/Staff';
import { StaffFiles } from '../models/StaffFiles';
import { LeaveRequestCount } from '../resolvers/outputs/LeaveRequestCount';

@TypeGraphQL.ObjectType('LeaveRequest', {
  description:"",
})
export class LeaveRequest {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodStart!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  AMPMStart!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  leavePeriodEnd?: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMEnd?: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  leaveDays!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  dateOfReturn!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  staffSignDate!: Date;

  calendarVacation?: CalendarVacation[];

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  fileId!: number;

  staffFile?: StaffFiles;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  staffId!: number;

  staff?: Staff;

  @TypeGraphQL.Field((_type) => LeaveRequestCount, {
    nullable: true,
  })
  _count?: LeaveRequestCount | null;
}
