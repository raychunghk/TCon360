import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('HolidayMinAggregate', {
  description:"",
})
export class HolidayMinAggregate {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  StartDate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  EndDate!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  Summary!: string | null;
}
