import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { NullableStringFieldUpdateOperationsInput } from './NullableStringFieldUpdateOperationsInput';
import { StringFieldUpdateOperationsInput } from './StringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('UserUpdateManyMutationInput')
export class UserUpdateManyMutationInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  email?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: NullableStringFieldUpdateOperationsInput | undefined;
}
