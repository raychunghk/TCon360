import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//import { DynamicModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { VacationsModule } from './vacations/vacations.module';
import { LeaveRequestModule } from './leaverequest/leaverequest.module';

@Module({
  /* should pass a NEXT.js server instance
      as the argument to `forRootAsync` */
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: true }),
      /* null means that nest-next 
                should look for pages in root dir */
      { viewsDir: null },
    ),
    UserModule,
    TestModule,
    TimesheetModule,
    LeaveRequestModule,
    VacationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
