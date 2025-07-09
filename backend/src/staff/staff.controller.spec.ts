import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service.js';
import { UsersService } from '../auth/users.service.js';
import { StaffFilesService } from '../shared/staffFiles.service.js';
import { StaffService } from './service/staff.service.js';
import { StaffController } from './staff.controller.js';

describe('StaffController', () => {
  let staffController: StaffController;
  let staffService: StaffService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [StaffService, StaffFilesService, AuthService, UsersService],
    }).compile();

    staffController = moduleRef.get<StaffController>(StaffController);
    staffService = moduleRef.get<StaffService>(StaffService);
  });

  describe('updateStaffContract', () => {
    it('should update staff contract', async () => {
      // Mock data
      const id = '1';
      const updateStaffContractDto: Prisma.StaffContractUpdateInput = {
        // Provide the necessary fields for updating the staff contract
      };
      const updatedStaffContract: Prisma.StaffContractUpdateInput = {
        // Provide the updated staff contract data
      };

      // Mock the service method
      //  jest.spyOn(staffService, 'updateStaffContract').mockResolvedValue(updatedStaffContract);

      // Call the controller method
      const result = await staffController.updateStaffContract(
        id,
        updateStaffContractDto,
      );

      // Assertions
      expect(result).toEqual(updatedStaffContract);
      expect(staffService.updateStaffContract).toHaveBeenCalledWith(
        id,
        updateStaffContractDto,
      );
    });
  });

  //   describe('create', () => {
  //     it('should create a staff', async () => {
  //       // Mock data
  //       const stf: Prisma.StaffCreateInput = {
  //         // Provide the necessary fields for creating a staff
  //       };
  //       const createdStaff: Prisma.Staff = {
  //         // Provide the created staff data
  //       };

  //       // Mock the service method
  //       jest.spyOn(staffService, 'createStaff').mockResolvedValue(createdStaff);

  //       // Call the controller method
  //       const result = await staffController.create(stf, 'dummyAuthHeader', { user: 'dummyUser' });

  //       // Assertions
  //       expect(result).toEqual(createdStaff);
  //       expect(staffService.createStaff).toHaveBeenCalledWith(stf, expect.anything());
  //     });
  //   });

  // Add more test cases for other methods as needed
});
