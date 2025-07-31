import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { env } from '@tcon360/config'; // Correct import from shared library
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl: url, ip, headers } = req;

    // Log basic request information
    this.logger.log(`[${method}] ${url} from ${ip}`);

    // Extract and log JWT details
    const authHeader = headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (token) {
      try {
        // Verify and decode the token
        const decoded = jwt.verify(token, env.JWT_SECRET, {
          complete: true,
        }) as { payload: { iat: number; exp: number } };
        const payload = decoded.payload;

        // Extract token details
        const issuedAt = new Date(payload.iat * 1000); // Convert seconds to milliseconds
        const expiresAt = new Date(payload.exp * 1000); // Convert seconds to milliseconds
        const currentTime = new Date();

        // Log token details
        this.logger.log('--- JWT Token Details ---');
        this.logger.log(
          `Token Issued At (Session Start): ${issuedAt.toISOString()}`,
        );
        this.logger.log(
          `Token Expires At (Session Expiry): ${expiresAt.toISOString()}`,
        );
        this.logger.log(`Current Time: ${currentTime.toISOString()}`);
        this.logger.log(
          `Time Until Expiry: ${(expiresAt.getTime() - currentTime.getTime()) / 1000} seconds`,
        );
        this.logger.log(`User Payload: ${JSON.stringify(payload)}`);

        // Attach decoded user data to request for downstream use
        req['user'] = payload;
      } catch (err) {
        this.logger.error('JWT Verification Error:', {
          name: err.name,
          message: err.message,
          token: token.substring(0, 10) + '...', // Log partial token for security
        });
        // Optionally throw UnauthorizedException if token is invalid/expired
        // throw new UnauthorizedException('Invalid or expired token');
      }
    } else {
      this.logger.warn('No token provided in request');
    }

    next();
  }
}
