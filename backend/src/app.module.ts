import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { StaffModule } from './staff/staff.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { LeaveRequestModule } from './leaverequest/leaverequest.module';
import { VacationsModule } from './vacations/vacations.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AdminModule } from './admin/admin.module';
import { LoggerMiddleware } from './common/logger.middleware';
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
