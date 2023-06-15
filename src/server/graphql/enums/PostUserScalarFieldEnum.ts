import * as TypeGraphQL from 'type-graphql';

export enum PostUserScalarFieldEnum {
  id = 'id',
  email = 'email',
  name = 'name',
}
TypeGraphQL.registerEnumType(PostUserScalarFieldEnum, {
  name: 'PostUserScalarFieldEnum',
  description: undefined,
});
