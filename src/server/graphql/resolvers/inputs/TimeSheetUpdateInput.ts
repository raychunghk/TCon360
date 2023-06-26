import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFieldUpdateOperationsInput } from '../inputs/DateTimeFieldUpdateOperationsInput';
import { DecimalFieldUpdateOperationsInput } from '../inputs/DecimalFieldUpdateOperationsInput';
import { IntFieldUpdateOperationsInput } from '../inputs/IntFieldUpdateOperationsInput';
import { NullableStringFieldUpdateOperationsInput } from '../inputs/NullableStringFieldUpdateOperationsInput';
import { TimeSheetCalendarUpdateManyWithoutTimesheetNestedInput } from '../inputs/TimeSheetCalendarUpdateManyWithoutTimesheetNestedInput';

@TypeGraphQL.InputType('TimeSheetUpdateInput', {
 description:"",
})
export class TimeSheetUpdateInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  StartDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  EndDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  TSCalendarID?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  TimeSheetFileName?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  TotalChargeableDay?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  TotalChargeableHour?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  TotalOTHour?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => TimeSheetCalendarUpdateManyWithoutTimesheetNestedInput,
    {
      nullable: true,
    },
  )
  calendar?: TimeSheetCalendarUpdateManyWithoutTimesheetNestedInput | undefined;
}
