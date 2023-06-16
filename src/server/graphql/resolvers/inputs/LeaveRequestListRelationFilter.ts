import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestWhereInput } from '../inputs/LeaveRequestWhereInput';

@TypeGraphQL.InputType('LeaveRequestListRelationFilter')
export class LeaveRequestListRelationFilter {
  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  every?: LeaveRequestWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  some?: LeaveRequestWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestWhereInput, {
    nullable: true,
  })
  none?: LeaveRequestWhereInput | undefined;
}
