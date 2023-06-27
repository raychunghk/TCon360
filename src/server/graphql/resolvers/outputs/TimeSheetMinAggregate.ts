import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('TimeSheetMinAggregate', {
  description:"",
})
export class TimeSheetMinAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  StartDate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  EndDate!: Date | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  TSCalendarID!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  TimeSheetFileName!: string | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  TotalChargeableDay!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  TotalChargeableHour!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
  TotalOTHour!: Prisma.Decimal | null;
}
