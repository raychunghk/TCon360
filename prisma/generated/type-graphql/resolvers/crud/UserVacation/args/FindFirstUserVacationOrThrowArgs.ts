import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationOrderByWithRelationInput } from '../../../inputs/UserVacationOrderByWithRelationInput';
import { UserVacationWhereInput } from '../../../inputs/UserVacationWhereInput';
import { UserVacationWhereUniqueInput } from '../../../inputs/UserVacationWhereUniqueInput';
import { UserVacationScalarFieldEnum } from '../../../../enums/UserVacationScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindFirstUserVacationOrThrowArgs {
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

  @TypeGraphQL.Field((_type) => [UserVacationScalarFieldEnum], {
    nullable: true,
  })
  distinct?: Array<'VacationDate' | 'ChargeableDay'> | undefined;
}
