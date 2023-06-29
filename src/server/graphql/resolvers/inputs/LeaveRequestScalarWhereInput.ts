import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { DateTimeNullableFilter } from '../inputs/DateTimeNullableFilter';
import { FloatFilter } from '../inputs/FloatFilter';
import { IntFilter } from '../inputs/IntFilter';
import { StringFilter } from '../inputs/StringFilter';
import { StringNullableFilter } from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('LeaveRequestScalarWhereInput', {
  description:"",
})
export class LeaveRequestScalarWhereInput {
  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereInput], {
    nullable: true,
  })
  AND?: LeaveRequestScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereInput], {
    nullable: true,
  })
  OR?: LeaveRequestScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereInput], {
    nullable: true,
  })
  NOT?: LeaveRequestScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  leavePeriodStart?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  AMPMStart?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  leavePeriodEnd?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  AMPMEnd?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  leaveDays?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  dateOfReturn?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  staffSignDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  fileId?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  staffId?: IntFilter | undefined;
}
