import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { SuccessResponse } from '../utils/global.type';
import { AdminGuard } from '../utils/guards/admin.guard';
import { StatusService } from './status.service';

@Controller('status')
@UseGuards(AdminGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  index(): SuccessResponse {
    return {
      success: true,
      status_code: HttpStatus.OK,
      data: this.statusService.getStatus(),
    };
  }
}
