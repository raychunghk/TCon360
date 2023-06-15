import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { TimeSheetWhereInput } from '../inputs/TimeSheetWhereInput';

@TypeGraphQL.InputType('TimeSheetRelationFilter')
export class TimeSheetRelationFilter {
  @TypeGraphQL.Field((_type) => TimeSheetWhereInput, {
    nullable: true,
  })
  is?: TimeSheetWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetWhereInput, {
    nullable: true,
  })
  isNot?: TimeSheetWhereInput | undefined;
}
