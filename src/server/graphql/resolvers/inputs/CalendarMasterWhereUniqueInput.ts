import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.InputType('CalendarMasterWhereUniqueInput', {
  description:"",
})
export class CalendarMasterWhereUniqueInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  CalendarDate?: Date | undefined;
}
