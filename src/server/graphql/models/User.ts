import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { Account } from '../models/Account';
import { Session } from '../models/Session';
import { Staff } from '../models/Staff';
import { UserCount } from '../resolvers/outputs/UserCount';

@TypeGraphQL.ObjectType('User', {
  description: '',
})
export class User {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  username?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email?: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  emailVerified?: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  image?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  accounts?: Account[];

  sessions?: Session[];

  staff?: Staff[];

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  staffId?: number | null;

  @TypeGraphQL.Field((_type) => UserCount, {
    nullable: true,
  })
  _count?: UserCount | null;
}
