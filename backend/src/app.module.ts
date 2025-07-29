import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './admin/admin.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { LoggerMiddleware } from './common/logger.middleware.js';
import { HealthModule } from './healthcheck/healthcheck.module.js';
import { HelloModule } from './hello/hello.module.js';
import { LeaveRequestModule } from './leaverequest/leaverequest.module.js';
import { StaffModule } from './staff/staff.module.js';
import { TimesheetModule } from './timesheet/timesheet.module.js';
import { VacationsModule } from './vacations/vacations.module.js';

@Module({
  imports: [
    HelloModule,
    CacheModule.register({ isGlobal: true }),
    StaffModule,
    TimesheetModule,
    LeaveRequestModule,
    VacationsModule,
    AuthModule,
    AdminModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
