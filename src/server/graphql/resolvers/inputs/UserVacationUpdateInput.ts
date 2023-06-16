import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeFieldUpdateOperationsInput } from '../inputs/DateTimeFieldUpdateOperationsInput';
import { DecimalFieldUpdateOperationsInput } from '../inputs/DecimalFieldUpdateOperationsInput';

@TypeGraphQL.InputType('UserVacationUpdateInput', {
  description: "",
})
export class UserVacationUpdateInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  VacationDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
  ChargeableDay?: DecimalFieldUpdateOperationsInput | undefined;
}
