import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { IntFilter } from './IntFilter';
import { LeaveRequestListRelationFilter } from './LeaveRequestListRelationFilter';
import { StringFilter } from './StringFilter';

@TypeGraphQL.InputType('StaffWhereInput')
export class StaffWhereInput {
  @TypeGraphQL.Field((_type) => [StaffWhereInput], {
    nullable: true,
  })
  AND?: StaffWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [StaffWhereInput], {
    nullable: true,
  })
  OR?: StaffWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [StaffWhereInput], {
    nullable: true,
  })
  NOT?: StaffWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  StaffName?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  AgentName?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  StaffCategory?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  Department?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  PostUnit?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  ManagerName?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  ManagerTitle?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  ManagerEmail?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestListRelationFilter, {
    nullable: true,
  })
  leaveRequests?: LeaveRequestListRelationFilter | undefined;
}
