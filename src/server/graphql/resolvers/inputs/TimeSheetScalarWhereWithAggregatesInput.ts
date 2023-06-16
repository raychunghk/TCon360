import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeWithAggregatesFilter } from '../inputs/DateTimeWithAggregatesFilter';
import { DecimalWithAggregatesFilter } from '../inputs/DecimalWithAggregatesFilter';
import { IntWithAggregatesFilter } from '../inputs/IntWithAggregatesFilter';

@TypeGraphQL.InputType('TimeSheetScalarWhereWithAggregatesInput', {
  description: "",
})
export class TimeSheetScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [TimeSheetScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: TimeSheetScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: TimeSheetScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: TimeSheetScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  StartDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  EndDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  TSCalendarID?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  TotalChargeableDay?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  TotalChargeableHour?: DecimalWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalWithAggregatesFilter, {
    nullable: true,
  })
  TotalOTHour?: DecimalWithAggregatesFilter | undefined;
}
