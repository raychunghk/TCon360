import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeNullableWithAggregatesFilter } from '../inputs/DateTimeNullableWithAggregatesFilter';
import { DateTimeWithAggregatesFilter } from '../inputs/DateTimeWithAggregatesFilter';
import { FloatWithAggregatesFilter } from '../inputs/FloatWithAggregatesFilter';
import { IntWithAggregatesFilter } from '../inputs/IntWithAggregatesFilter';
import { StringNullableWithAggregatesFilter } from '../inputs/StringNullableWithAggregatesFilter';
import { StringWithAggregatesFilter } from '../inputs/StringWithAggregatesFilter';

@TypeGraphQL.InputType('LeaveRequestScalarWhereWithAggregatesInput', {
  description:"",
})
export class LeaveRequestScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: LeaveRequestScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: LeaveRequestScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LeaveRequestScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: LeaveRequestScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  leavePeriodStart?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  AMPMStart?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  leavePeriodEnd?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  AMPMEnd?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  leaveDays?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  dateOfReturn?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  staffSignDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  fileId?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  staffId?: IntWithAggregatesFilter | undefined;
}
