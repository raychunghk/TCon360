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

// Calculate expiresIn value from environment variables
const tokenMaxAgeMs = env.TOKEN_MAX_AGE || 1200000; // Default to 20 minutes
const expiresInMinutes = tokenMaxAgeMs / 1000 / 60;
const expiresIn = `${expiresInMinutes}m`;
const expiresInSeconds = Math.floor(tokenMaxAgeMs / 1000);

// Prepare JWT options
const jwtModuleOptions = {
  secret: env.JWT_SECRET,
  signOptions: {
    // Use seconds (number) for type safety, which satisfies 'number | StringValue'
    expiresIn: expiresInSeconds,
  },
};

// Log the configuration during Nest.js startup
console.log('🔐 [AuthModule] Initializing JwtModule with options:\r\n', {
  secretIsSet: !!jwtModuleOptions.secret,
  expiresIn: `${jwtModuleOptions.signOptions.expiresIn}s`, // Log as seconds for clarity
  expiresInMinutes: `${expiresIn}`,
});

@Module({
  imports: [
    PassportModule,
    JwtModule.register(jwtModuleOptions),
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
export class AuthModule { }
