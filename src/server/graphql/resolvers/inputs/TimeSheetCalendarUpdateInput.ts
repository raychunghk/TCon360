import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFieldUpdateOperationsInput } from '../inputs/DateTimeFieldUpdateOperationsInput';
import { DecimalFieldUpdateOperationsInput } from '../inputs/DecimalFieldUpdateOperationsInput';
import { IntFieldUpdateOperationsInput } from '../inputs/IntFieldUpdateOperationsInput';
import { TimeSheetUpdateOneRequiredWithoutCalendarNestedInput } from '../inputs/TimeSheetUpdateOneRequiredWithoutCalendarNestedInput';

@TypeGraphQL.InputType('TimeSheetCalendarUpdateInput', {
  description: '',
})
export class TimeSheetCalendarUpdateInput {
  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  DayID?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  CalendarDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  ChargeableDay?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  ChargeableHour?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  Training?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  Vacation?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  PublicHoliday?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  WeekEnd?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  Others?: DecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => TimeSheetUpdateOneRequiredWithoutCalendarNestedInput,
    {
      nullable: true,
    },
  )
  timesheet?: TimeSheetUpdateOneRequiredWithoutCalendarNestedInput | undefined;
}
