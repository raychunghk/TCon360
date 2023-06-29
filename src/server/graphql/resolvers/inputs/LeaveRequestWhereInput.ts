import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarVacationListRelationFilter } from '../inputs/CalendarVacationListRelationFilter';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { DateTimeNullableFilter } from '../inputs/DateTimeNullableFilter';
import { FloatFilter } from '../inputs/FloatFilter';
import { IntFilter } from '../inputs/IntFilter';
import { StaffFilesRelationFilter } from '../inputs/StaffFilesRelationFilter';
import { StaffRelationFilter } from '../inputs/StaffRelationFilter';
import { StringFilter } from '../inputs/StringFilter';
import { StringNullableFilter } from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('LeaveRequestWhereInput', {
  description:"",
})
export class LeaveRequestWhereInput {
  @TypeGraphQL.Field((_type) => [LeaveRequestWhereInput], {
    nullable: true,
  })
  AND?: LeaveRequestWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereInput], {
    nullable: true,
  })
  OR?: LeaveRequestWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestWhereInput], {
    nullable: true,
  })
  NOT?: LeaveRequestWhereInput[] | undefined;

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

  @TypeGraphQL.Field((_type) => CalendarVacationListRelationFilter, {
    nullable: true,
  })
  calendarVacation?: CalendarVacationListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => StaffFilesRelationFilter, {
    nullable: true,
  })
  staffFile?: StaffFilesRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => StaffRelationFilter, {
    nullable: true,
  })
  staff?: StaffRelationFilter | undefined;
}
