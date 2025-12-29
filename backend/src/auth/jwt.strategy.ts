import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { env } from '@tcon360/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtPayload } from './jwtpayload.interface.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismasrv: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
    });
  }
  psm = this.prismasrv.client;
  async validate(payload: JwtPayload) {
    const { sub: userId } = payload;
    const user = await this.psm.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
