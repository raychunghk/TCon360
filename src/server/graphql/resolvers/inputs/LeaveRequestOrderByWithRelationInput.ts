import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarVacationOrderByRelationAggregateInput } from '../inputs/CalendarVacationOrderByRelationAggregateInput';
import { StaffFilesOrderByWithRelationInput } from '../inputs/StaffFilesOrderByWithRelationInput';
import { StaffOrderByWithRelationInput } from '../inputs/StaffOrderByWithRelationInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('LeaveRequestOrderByWithRelationInput', {
  description: '',
})
export class LeaveRequestOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  leavePeriodStart?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  AMPMStart?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  leavePeriodEnd?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  AMPMEnd?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  leaveDays?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  dateOfReturn?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  staffSignDate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  fileId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  staffId?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => CalendarVacationOrderByRelationAggregateInput, {
    nullable: true,
  })
  calendarVacation?: CalendarVacationOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => StaffOrderByWithRelationInput, {
    nullable: true,
  })
  staff?: StaffOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => StaffFilesOrderByWithRelationInput, {
    nullable: true,
  })
  staffFile?: StaffFilesOrderByWithRelationInput | undefined;
}
