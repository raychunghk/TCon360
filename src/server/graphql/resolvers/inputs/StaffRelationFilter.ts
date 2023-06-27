import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffWhereInput } from '../inputs/StaffWhereInput';

@TypeGraphQL.InputType('StaffRelationFilter', {
  description:"",
})
export class StaffRelationFilter {
  @TypeGraphQL.Field((_type) => StaffWhereInput, {
    nullable: true,
  })
  is?: StaffWhereInput | undefined;

  @TypeGraphQL.Field((_type) => StaffWhereInput, {
    nullable: true,
  })
  isNot?: StaffWhereInput | undefined;
}
