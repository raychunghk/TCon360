import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('LeaveRequestMinAggregate', {
 description:"",
})
export class LeaveRequestMinAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  leavePeriodStart!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMStart!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  leavePeriodEnd!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMEnd!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  leaveDays!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  dateOfReturn!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  staffSignDate!: Date | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  staffId!: number | null;
}
