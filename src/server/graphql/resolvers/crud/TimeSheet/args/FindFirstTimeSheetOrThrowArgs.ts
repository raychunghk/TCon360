import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetOrderByWithRelationInput } from '../../../inputs/TimeSheetOrderByWithRelationInput';
import { TimeSheetWhereInput } from '../../../inputs/TimeSheetWhereInput';
import { TimeSheetWhereUniqueInput } from '../../../inputs/TimeSheetWhereUniqueInput';
import { TimeSheetScalarFieldEnum } from '../../../../enums/TimeSheetScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindFirstTimeSheetOrThrowArgs {
  @TypeGraphQL.Field((_type) => TimeSheetWhereInput, {
    nullable: true,
  })
  where?: TimeSheetWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: TimeSheetOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => TimeSheetWhereUniqueInput, {
    nullable: true,
  })
  cursor?: TimeSheetWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [TimeSheetScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | 'id'
        | 'StartDate'
        | 'EndDate'
        | 'TSCalendarID'
        | 'TimeSheetFileName'
        | 'TotalChargeableDay'
        | 'TotalChargeableHour'
        | 'TotalOTHour'
      >
    | undefined;
}
