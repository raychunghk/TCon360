import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CalendarVacationCreateNestedManyWithoutLeaveRequestInput } from '../inputs/CalendarVacationCreateNestedManyWithoutLeaveRequestInput';
import { StaffFilesCreateNestedOneWithoutLeaveRequestInput } from '../inputs/StaffFilesCreateNestedOneWithoutLeaveRequestInput';

@TypeGraphQL.InputType('LeaveRequestCreateWithoutStaffInput', {
  description: '',
})
export class LeaveRequestCreateWithoutStaffInput {
  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  leavePeriodStart!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  AMPMStart!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  leavePeriodEnd?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  AMPMEnd?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  leaveDays!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  dateOfReturn!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  staffSignDate!: Date;

  @TypeGraphQL.Field(
    (_type) => CalendarVacationCreateNestedManyWithoutLeaveRequestInput,
    {
      nullable: true,
    },
  )
  calendarVacation?:
    | CalendarVacationCreateNestedManyWithoutLeaveRequestInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => StaffFilesCreateNestedOneWithoutLeaveRequestInput,
    {
      nullable: false,
    },
  )
  staffFile!: StaffFilesCreateNestedOneWithoutLeaveRequestInput;
}
