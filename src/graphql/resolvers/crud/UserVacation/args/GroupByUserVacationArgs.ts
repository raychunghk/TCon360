import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { UserVacationOrderByWithAggregationInput } from '../../../inputs/UserVacationOrderByWithAggregationInput';
import { UserVacationScalarWhereWithAggregatesInput } from '../../../inputs/UserVacationScalarWhereWithAggregatesInput';
import { UserVacationWhereInput } from '../../../inputs/UserVacationWhereInput';
import { UserVacationScalarFieldEnum } from '../../../../enums/UserVacationScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByUserVacationArgs {
  @TypeGraphQL.Field((_type) => UserVacationWhereInput, {
    nullable: true,
  })
  where?: UserVacationWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: UserVacationOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserVacationScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<'VacationDate' | 'ChargeableDay'>;

  @TypeGraphQL.Field((_type) => UserVacationScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: UserVacationScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
