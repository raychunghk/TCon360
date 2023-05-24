import { Controller, Get, Req, Post, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cat')
export class CatController {
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
  @Get(':id')
  findAll(@Req() request: Request, @Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
