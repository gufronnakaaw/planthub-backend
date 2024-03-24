import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from '../utils/global.type';
import { AdminGuard } from '../utils/guards/admin.guard';
import { ZodValidationPipe } from '../utils/pipes/zod.pipe';
import {
  LoginAdminDto,
  RegisterAdminDto,
  loginAdminSchema,
  registerAdminSchema,
} from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(loginAdminSchema))
  async login(@Body() body: LoginAdminDto): Promise<SuccessResponse> {
    try {
      const { id, name, picture } = await this.adminService.login(body);

      const access_token = await this.jwtService.signAsync({
        id,
        role: 'admin',
      });

      return {
        success: true,
        status_code: HttpStatus.OK,
        data: {
          name,
          picture,
          access_token,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  @UseGuards(AdminGuard)
  @UsePipes(new ZodValidationPipe(registerAdminSchema))
  async register(@Body() body: RegisterAdminDto): Promise<SuccessResponse> {
    try {
      await this.adminService.register(body);

      return {
        success: true,
        status_code: HttpStatus.CREATED,
        message: 'Register admin successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
