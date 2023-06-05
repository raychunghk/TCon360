import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import * as fs from 'fs';
@Controller('api/test')
export class TestController {
  @Get()
  getfile() {
    const content = fs.readFileSync('./hello.txt', 'utf8');
    return { content };
  }
}
