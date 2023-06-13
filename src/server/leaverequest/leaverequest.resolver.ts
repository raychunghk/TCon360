import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { LeaveRequest } from 'src/graphql/models/LeaveRequest';
import { LeaveRequestService } from './service/leaverequest.service';

@Resolver(() => LeaveRequest)
export class LeaveRequestResolver {
  constructor(private readonly leaveRequestService: LeaveRequestService) { }

  @Mutation(() => LeaveRequest)
  async createLeaveRequest(
    @Args('leaveRequest') leaveRequest: LeaveRequest,
  ): Promise<LeaveRequest> {
    return this.leaveRequestService.createLeaveRequestforgql(leaveRequest);
  }
}