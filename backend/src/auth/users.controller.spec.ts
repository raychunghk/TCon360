import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { UsersController } from './users.controller.js';

describe('UsersController', () => {
  let controller: UsersController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [AuthService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginDto = { identifier: 'tcon360', password: 'admin' };
      const accessToken = 'sampleAccessToken';

      jest.spyOn(authService, 'login').mockResolvedValueOnce(accessToken);

      const result = await controller.login(loginDto);

      expect(result).toEqual({ accessToken });
      expect(authService.login).toHaveBeenCalledWith(
        loginDto.identifier,
        loginDto.password,
      );
    });
  });
});
