import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { FloatFilter } from '../inputs/FloatFilter';
import { IntFilter } from '../inputs/IntFilter';
import { StaffRelationFilter } from '../inputs/StaffRelationFilter';
import { StringNullableFilter } from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('LeaveRequestWhereInput', {
  description: "",
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

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  AMPMStart?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  leavePeriodEnd?: DateTimeFilter | undefined;

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
  staffId?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => StaffRelationFilter, {
    nullable: true,
  })
  staff?: StaffRelationFilter | undefined;
}
