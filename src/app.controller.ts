import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextService } from './next/next.service';

@Controller()
export class AppController {
  constructor(private readonly next: NextService) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response) {
    // 把原本由Nest处理的主页转交给next
    return this.next.render('/index', req, res);
  }
}
