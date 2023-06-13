import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFieldUpdateOperationsInput } from './DateTimeFieldUpdateOperationsInput';
import { IntFieldUpdateOperationsInput } from './IntFieldUpdateOperationsInput';
import { NullableStringFieldUpdateOperationsInput } from './NullableStringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('CalendarMasterUpdateInput')
export class CalendarMasterUpdateInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  CalendarDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  WeekDayName?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  Year?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  Month?: IntFieldUpdateOperationsInput | undefined;
}
