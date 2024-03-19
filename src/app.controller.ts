import { Controller, Get, HttpStatus } from '@nestjs/common';
import { SuccessResponse } from './utils/global.type';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(): SuccessResponse {
    return {
      success: true,
      status_code: HttpStatus.OK,
      message: 'Welcome to Planthub REST API',
    };
  }
}
