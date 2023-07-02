import * as TypeGraphQL from 'type-graphql';

export enum UserScalarFieldEnum {
  id = 'id',
  username = 'username',
  name = 'name',
  email = 'email',
  emailVerified = 'emailVerified',
  image = 'image',
  password = 'password',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  staffId = 'staffId',
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: 'UserScalarFieldEnum',
  description: undefined,
});
