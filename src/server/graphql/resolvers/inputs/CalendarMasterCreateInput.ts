import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.InputType('CalendarMasterCreateInput', {
 description:"",
})
export class CalendarMasterCreateInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  CalendarDate!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  WeekDayName?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  Year!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  Month!: number;
}
