import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  @UseInterceptors(ParamsInterceptor)
  home() {
    return {};
  }
  @Get('test')
  @Render('test')
  @UseInterceptors(ParamsInterceptor)
  public test() {
    return {};
  }
  @Get('timesheet')
  @Render('timesheet')
  @UseInterceptors(ParamsInterceptor)
  public timesheet() {
    return {};
  }

  @Get('login')
  @Render('login')
  @UseInterceptors(ParamsInterceptor)
  public login() {
    return {};
  }
 
}
