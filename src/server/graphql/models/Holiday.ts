import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';

@TypeGraphQL.ObjectType('Holiday')
export class Holiday {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  StartDate!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  EndDate!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  Summary?: string | null;
}
