import { Test } from '@nestjs/testing';
import LeaveRequestService from './leaverequest.service';
import { PrismaService } from '../../prisma/prisma.service';
import { StaffService } from '../../staff/service/staff.service';
import { StaffFilesService } from '../../shared/staffFiles.service';
import { Logger } from '@nestjs/common';
import { Prisma, Staff } from '@prisma/client';



describe('LeaveRequestService', () => {
  let leaveRequestService: LeaveRequestService;
  let staffService: StaffService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LeaveRequestService,
        StaffService,
        PrismaService,
    
       
        {
          provide: StaffFilesService,
          useValue: {},
        },
      ],
    }).compile();

    leaveRequestService = moduleRef.get<LeaveRequestService>(LeaveRequestService);
    staffService = moduleRef.get<StaffService>(StaffService);
  });

  describe('useStaffService', () => {
    it('should able to use staffservice', async () => {
      const staffId = 1;
   
      const staff: Staff = {
        id: 1,
        StaffName: 'John Doe',
        AgentName: 'Jane Smith',
        StaffCategory: 'Manager',
        Department: 'Sales',
        PostUnit: 'North Region',
        ManagerName: 'Mark Johnson',
        ManagerTitle: 'Sales Director',
        ManagerEmail: 'mark.johnson@example.com',
        userId: '1234',
      
        
      };
     // jest.spyOn(staffService, 'getStaffById').mockResolvedValue(staff);

      const createdStaff = await leaveRequestService.useStaffService (staffId);

      expect(createdStaff).toBeDefined();
   
    });
  });
  describe('createword', () => {
    it.only('should create a new Leave Request for a staff member', async () => {
      const staffId = 1;
      let  leaveRequest2: Prisma.LeaveRequestCreateInput = {
        leavePeriodStart: new Date('2023-06-05'),
        leavePeriodEnd: null,
        leaveDays: 1,
        AMPMStart:"AMPM",
        
        
        dateOfReturn: new Date('2023-06-06'),
        staffSignDate: new Date('2023-06-05'),
        staff: null,
        staffFile: null
      };
      let  leaveRequest: Prisma.LeaveRequestCreateInput =  {
        leavePeriodStart: "2023-06-08T00:00:00.000Z",
        leavePeriodEnd: null,
        AMPMEnd: "NA",
        AMPMStart: "AMPM",
        leaveDays: 1,
        dateOfReturn: "2023-06-09T00:00:00.000Z",
        staffSignDate: "2023-06-29T11:41:53.941Z",
        staff: null,
        staffFile: null
      }
      const createdLeaveRequest = await leaveRequestService.createword(staffId, leaveRequest);

      expect(createdLeaveRequest).toBeDefined();
      // expect(createdLeaveRequest.staffId).toEqual(staffId);
      // expect(createdLeaveRequest.leavePeriodStart).toEqual(leaveRequest.leavePeriodStart);
      // expect(createdLeaveRequest.leavePeriodEnd).toEqual(leaveRequest.leavePeriodEnd);
      // expect(createdLeaveRequest.leaveDays).toEqual(leaveRequest.leaveDays);
      // expect(createdLeaveRequest.dateOfReturn).toEqual(leaveRequest.dateOfReturn);
      // expect(createdLeaveRequest.staffSignDate).toEqual(leaveRequest.staffSignDate);
    });
  });
  describe('getDateArray', () => {
    it('should return an array of dates between start and end dates', () => {
      const startDate = new Date('2023-07-01');
      const endDate = new Date('2023-07-05');
      const expectedResult = [
        new Date('2023-07-01'),
        new Date('2023-07-02'),
        new Date('2023-07-03'),
        new Date('2023-07-04'),
        new Date('2023-07-05'),
      ];
      Logger.verbose(expectedResult);
      console.log('expectedResult')
      console.log(expectedResult)
      const result = leaveRequestService.getDateArray(startDate, endDate);

      console.log('actual result')
      console.log(result)
      expect(result).toEqual(expectedResult);
    });
  });
});