import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Always allow access
    const req = context.switchToHttp().getRequest();
    console.log('JwtAuthGuard called');
    return super.canActivate(context);
  }
}