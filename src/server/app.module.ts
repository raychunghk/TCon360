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
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jswstrategy';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  /* should pass a NEXT.js server instance
      as the argument to `forRootAsync` */
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'), // <-- changed rootPath
    }),
    RenderModule.forRootAsync(
      Next({ dev: true }),
      /* null means that nest-next 
                should look for pages in root dir */
      { viewsDir: null },
    ),
    StaffModule,
    TestModule,
    TimesheetModule,
    LeaveRequestModule,
    VacationsModule,
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: true,
      validate: false,
      path: '/absproxy/5000/graphql'
      , authChecker: ({ context }, roles) => {
        return true;
      },
     // globalMiddlewares: [JwtAuthGuard],
    }), RecipeModule,PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  exports: [PassportModule, AuthService],
  providers: [AppService, UserResolver, PrismaService, AuthService,
    JwtStrategy],
})
export class AppModule { }


