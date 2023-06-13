import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class LeaveRequestResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() =>PrismaService.prototype.leaveRequest)
  async createLeaveRequest(@Args('data') data: Prisma.LeaveRequestCreateInput) {
    return this.prisma.leaveRequest.create({ data });
  }
}