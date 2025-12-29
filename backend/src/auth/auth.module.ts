import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from '@tcon360/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { StaffService } from '../staff/service/staff.service.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './jwt.strategy.js';
import { LocalStrategy } from './local.strategy.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: `${(env.TOKEN_MAX_AGE || 1200000) / 1000 / 60}m`,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    PrismaService,
    StaffService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
