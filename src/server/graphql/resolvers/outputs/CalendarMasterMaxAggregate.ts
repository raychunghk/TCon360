import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('CalendarMasterMaxAggregate', {
  description: '',
})
export class CalendarMasterMaxAggregate {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  CalendarDate!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  WeekDayName!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  Year!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  Month!: number | null;
}
