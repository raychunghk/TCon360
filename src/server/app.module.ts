import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//import { DynamicModule, Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { TestModule } from './test/test.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { VacationsModule } from './vacations/vacations.module';
import { LeaveRequestModule } from './leaverequest/leaverequest.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeGraphQLModule } from "typegraphql-nestjs";
import RecipeModule from './recipe/module';
import { AuthChecker } from 'type-graphql';
import { PrismaService } from './prisma/prisma.service';
import { UserResolver } from './user/user.resolver';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { AuthModule } from './auth/auth.module';
@Module({
  /* should pass a NEXT.js server instance
      as the argument to `forRootAsync` */
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: true }),
      /* null means that nest-next 
                should look for pages in root dir */
      { passthrough404: true, viewsDir: null },
    
    ),
    StaffModule,
    TestModule,
    TimesheetModule,
    LeaveRequestModule,
    VacationsModule,
    AuthModule,
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: true,
      validate: false,
      path: '/absproxy/5000/graphql'
      , authChecker: ({ context }, roles) => {
        return true;
      },
  
    }), RecipeModule,
  ],
  controllers: [AppController],

  providers: [AppService, UserResolver, PrismaService],
})
export class AppModule { }


