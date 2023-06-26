import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { Staff } from '../models/Staff';

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
    nullable: true,
  })
  AMPMStart?: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodEnd!: Date;

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

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  requestFormFileName?: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  staffId!: number;

  staff?: Staff;
}
