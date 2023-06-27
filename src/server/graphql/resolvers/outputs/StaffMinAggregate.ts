import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';

@TypeGraphQL.ObjectType('StaffMinAggregate', {
  description:"",
})
export class StaffMinAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  StaffName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AgentName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  StaffCategory!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  Department!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  PostUnit!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  ManagerName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  ManagerTitle!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  ManagerEmail!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  userId!: string | null;
}
