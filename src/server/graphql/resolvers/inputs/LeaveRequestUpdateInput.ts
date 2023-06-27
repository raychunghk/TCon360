import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFieldUpdateOperationsInput } from '../inputs/DateTimeFieldUpdateOperationsInput';
import { FloatFieldUpdateOperationsInput } from '../inputs/FloatFieldUpdateOperationsInput';
import { NullableStringFieldUpdateOperationsInput } from '../inputs/NullableStringFieldUpdateOperationsInput';
import { StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput } from '../inputs/StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput';
import { StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput } from '../inputs/StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput';

@TypeGraphQL.InputType('LeaveRequestUpdateInput', {
  description:"",
})
export class LeaveRequestUpdateInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  leavePeriodStart?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  AMPMStart?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  leavePeriodEnd?: DateTimeFieldUpdateOperationsInput | undefined;

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
    (_type) => StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput,
    {
      nullable: true,
    },
  )
  staffFile?:
    | StaffFilesUpdateOneRequiredWithoutLeaveRequestNestedInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput,
    {
      nullable: true,
    },
  )
  staff?: StaffUpdateOneRequiredWithoutLeaveRequestsNestedInput | undefined;
}
