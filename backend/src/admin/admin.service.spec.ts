import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  Staff,
  LeaveRequest,
  StaffContract,
  staffFiles,
  User,
} from '@prisma/client';

describe('AdminService', () => {
  let adminService: AdminService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, PrismaService],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    prismaService = module.get<PrismaService>(PrismaService); // Get PrismaService instance
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
  });

  describe('createPublicHoliday', () => {
    it('should create public holiday records successfully', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      await adminService.createPublicHoliday(
        'https://www.1823.gov.hk/common/ical/tc.json',
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Public holiday records generated successfully.',
      );
    });
  });

  describe('userBackup', () => {
    it('should return user backup data', async () => {
      const userId = 'cllno93bm0001plh3tsbdj0ff';
      /*
      // Mock Prisma findMany and findUnique
      const mockStaff: Staff[] = [
        // Example mock data, adjust as needed
        {
          id: 'staff1',
          userId,
          name: 'Staff 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockLeaveRequests: LeaveRequest[] = [
        {
          id: 'leave1',
          staffId: 'staff1',
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'PENDING',
          leaveType: 'ANNUAL',
        },
      ];
      const mockContracts: StaffContract[] = [
        {
          id: 'contract1',
          staffId: 'staff1',
          IsActive: true,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const mockFiles: StaffFile[] = [
        {
          id: 'file1',
          staffId: 'staff1',
          filename: 'file.txt',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const mockUser: User = {
        id: userId,
        email: 'test@example.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaService.staff.findMany = jest.fn().mockResolvedValue(
        mockStaff.map((staff) => ({
          ...staff,
          leaveRequests: mockLeaveRequests.filter(
            (lr) => lr.staffId === staff.id,
          ),
          contracts: mockContracts.filter((c) => c.staffId === staff.id),
          staffFiles: mockFiles.filter((f) => f.staffId === staff.id),
        })),
      );
      prismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser);
*/
      const result = await adminService.userBackup(userId);
      // Check if the result is a string before proceeding
      if (typeof result !== 'string') {
        console.error('Error: userBackup did not return a string.', result);
        // Fail the test or throw an error as appropriate
        expect(typeof result).toBe('string'); // This will fail the test
        return; // Stop further execution of the test case
      }

      try {
        const parsedResult = JSON.parse(result); // Try to parse to check validity

        const formattedResult = JSON.stringify(parsedResult, null, 2); // Re-stringify with formatting
        const lines = formattedResult.split('\n');
        const first30Lines = lines.slice(0, 30).join('\n');

        console.log('Test backup result (first 30 lines):\n', first30Lines);

        // Assertions (if any) should go here, using parsedResult
        expect(parsedResult).toBeDefined(); // Or more specific assertions
        // Example: expect(parsedResult.backupData.leaveRequests).toHaveLength(2);
      } catch (error) {
        console.error('Error parsing JSON result:', error, result);
        // Fail the test or throw an error
        throw error; // This will fail the test and provide the error message
      }
    });
  });
});
