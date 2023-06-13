import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationOrderByWithRelationInput } from '../../../inputs/UserVacationOrderByWithRelationInput';
import { UserVacationWhereInput } from '../../../inputs/UserVacationWhereInput';
import { UserVacationWhereUniqueInput } from '../../../inputs/UserVacationWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationWhereInput, {
    nullable: true,
  })
  where?: UserVacationWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: UserVacationOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => UserVacationWhereUniqueInput, {
    nullable: true,
  })
  cursor?: UserVacationWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
