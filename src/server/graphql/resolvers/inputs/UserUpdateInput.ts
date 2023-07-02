import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { AccountUpdateManyWithoutUserNestedInput } from '../inputs/AccountUpdateManyWithoutUserNestedInput';
import { DateTimeFieldUpdateOperationsInput } from '../inputs/DateTimeFieldUpdateOperationsInput';
import { NullableDateTimeFieldUpdateOperationsInput } from '../inputs/NullableDateTimeFieldUpdateOperationsInput';
import { NullableIntFieldUpdateOperationsInput } from '../inputs/NullableIntFieldUpdateOperationsInput';
import { NullableStringFieldUpdateOperationsInput } from '../inputs/NullableStringFieldUpdateOperationsInput';
import { SessionUpdateManyWithoutUserNestedInput } from '../inputs/SessionUpdateManyWithoutUserNestedInput';
import { StaffUpdateManyWithoutUserNestedInput } from '../inputs/StaffUpdateManyWithoutUserNestedInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('UserUpdateInput', {
  description: '',
})
export class UserUpdateInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  username?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  email?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  emailVerified?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  image?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  password?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableIntFieldUpdateOperationsInput, {
    nullable: true,
  })
  staffId?: NullableIntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => AccountUpdateManyWithoutUserNestedInput, {
    nullable: true,
  })
  accounts?: AccountUpdateManyWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field((_type) => SessionUpdateManyWithoutUserNestedInput, {
    nullable: true,
  })
  sessions?: SessionUpdateManyWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field((_type) => StaffUpdateManyWithoutUserNestedInput, {
    nullable: true,
  })
  staff?: StaffUpdateManyWithoutUserNestedInput | undefined;
}
