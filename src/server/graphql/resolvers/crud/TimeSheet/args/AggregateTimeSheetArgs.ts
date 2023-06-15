import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { TimeSheetOrderByWithRelationInput } from '../../../inputs/TimeSheetOrderByWithRelationInput';
import { TimeSheetWhereInput } from '../../../inputs/TimeSheetWhereInput';
import { TimeSheetWhereUniqueInput } from '../../../inputs/TimeSheetWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateTimeSheetArgs {
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
}
