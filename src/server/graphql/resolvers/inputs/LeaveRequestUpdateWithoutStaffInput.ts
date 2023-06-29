import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarVacationUpdateManyWithoutLeaveRequestNestedInput } from '../inputs/CalendarVacationUpdateManyWithoutLeaveRequestNestedInput';
import { DateTimeFieldUpdateOperationsInput } from '../inputs/DateTimeFieldUpdateOperationsInput';
import { FloatFieldUpdateOperationsInput } from '../inputs/FloatFieldUpdateOperationsInput';
import { NullableDateTimeFieldUpdateOperationsInput } from '../inputs/NullableDateTimeFieldUpdateOperationsInput';
import { NullableStringFieldUpdateOperationsInput } from '../inputs/NullableStringFieldUpdateOperationsInput';
import { StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput } from '../inputs/StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('LeaveRequestUpdateWithoutStaffInput', {
  description:"",
})
export class LeaveRequestUpdateWithoutStaffInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  leavePeriodStart?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  AMPMStart?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  leavePeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  AMPMEnd?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  leaveDays?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  dateOfReturn?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  staffSignDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => CalendarVacationUpdateManyWithoutLeaveRequestNestedInput,
    {
      nullable: true,
    },
  )
  calendarVacation?:
    | CalendarVacationUpdateManyWithoutLeaveRequestNestedInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput,
    {
      nullable: true,
    },
  )
  staffFile?:
    | StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput
    | undefined;
}
