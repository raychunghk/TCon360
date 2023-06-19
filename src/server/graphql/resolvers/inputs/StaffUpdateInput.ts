import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { LeaveRequestUpdateManyWithoutStaffNestedInput } from '../inputs/LeaveRequestUpdateManyWithoutStaffNestedInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';
import { UserUpdateOneWithoutStaffNestedInput } from '../inputs/UserUpdateOneWithoutStaffNestedInput';

@TypeGraphQL.InputType('StaffUpdateInput', {
 description:"",
})
export class StaffUpdateInput {
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

  @TypeGraphQL.Field((_type) => UserUpdateOneWithoutStaffNestedInput, {
    nullable: true,
  })
  user?: UserUpdateOneWithoutStaffNestedInput | undefined;

  @TypeGraphQL.Field((_type) => LeaveRequestUpdateManyWithoutStaffNestedInput, {
    nullable: true,
  })
  leaveRequests?: LeaveRequestUpdateManyWithoutStaffNestedInput | undefined;
}
