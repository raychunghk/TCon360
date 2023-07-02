import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { StaffFilesUpdateManyWithoutStaffNestedInput } from '../inputs/StaffFilesUpdateManyWithoutStaffNestedInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';
import { UserUpdateOneRequiredWithoutStaffNestedInput } from '../inputs/UserUpdateOneRequiredWithoutStaffNestedInput';

@TypeGraphQL.InputType('StaffUpdateWithoutLeaveRequestsInput', {
  description: '',
})
export class StaffUpdateWithoutLeaveRequestsInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  StaffName?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  AgentName?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  StaffCategory?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  Department?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  PostUnit?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  ManagerName?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  ManagerTitle?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  ManagerEmail?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpdateOneRequiredWithoutStaffNestedInput, {
    nullable: true,
  })
  user?: UserUpdateOneRequiredWithoutStaffNestedInput | undefined;

  @TypeGraphQL.Field((_type) => StaffFilesUpdateManyWithoutStaffNestedInput, {
    nullable: true,
  })
  staffFiles?: StaffFilesUpdateManyWithoutStaffNestedInput | undefined;
}
