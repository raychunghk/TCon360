import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

describe('UsersController', () => {
  let controller: UsersController;

  const authServiceMock = {
    login: jest.fn(),
    handleGoogleSignup: jest.fn(),
    handleGoogleAuth: jest.fn(),
  };

  const usersServiceMock = {
    getUserWithStaffAndContract: jest.fn(),
  };

  beforeEach(async () => {
    process.env.TOKEN_MAX_AGE = '2592000000';

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return accessToken, user and tokenMaxAge', async () => {
      authServiceMock.login.mockResolvedValueOnce({
        token: 'sampleAccessToken',
        user: { id: 'u1', email: 'u1@example.com' },
      });

      const result = await controller.login({
        identifier: 'u1@example.com',
        password: 'password',
      });

      expect(result).toEqual({
        accessToken: 'sampleAccessToken',
        user: { id: 'u1', email: 'u1@example.com' },
        tokenMaxAge: 2592000,
      });

      expect(authServiceMock.login).toHaveBeenCalledWith('u1@example.com', 'password', {
        excludeViewStaff: false,
      });
    });

    it('should pass excludeViewStaff to authService.login when provided', async () => {
      authServiceMock.login.mockResolvedValueOnce({
        token: 'sampleAccessToken',
        user: { id: 'u1', email: 'u1@example.com' },
      });

      await controller.login({
        identifier: 'u1@example.com',
        password: 'password',
        excludeViewStaff: true,
      });

      expect(authServiceMock.login).toHaveBeenCalledWith('u1@example.com', 'password', {
        excludeViewStaff: true,
      });
    });
  });

  describe('handleGoogleSignup', () => {
    it('should return accessToken, user and tokenMaxAge', async () => {
      authServiceMock.handleGoogleSignup.mockResolvedValueOnce({
        token: 'googleAccessToken',
        user: { id: 'u2', email: 'u2@example.com', name: 'User 2' },
      });

      const result = await controller.handleGoogleSignup({
        googleId: 'google-123',
        email: 'u2@example.com',
        name: 'User 2',
        picture: 'https://example.com/pic.jpg',
      });

      expect(result).toEqual({
        accessToken: 'googleAccessToken',
        user: { id: 'u2', email: 'u2@example.com', name: 'User 2' },
        tokenMaxAge: 2592000,
      });

      expect(authServiceMock.handleGoogleSignup).toHaveBeenCalledWith({
        googleId: 'google-123',
        email: 'u2@example.com',
        name: 'User 2',
        picture: 'https://example.com/pic.jpg',
      });
    });
  });
});
