import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/utils/global.type';
import { ZodValidationPipe } from '../utils/pipes/zod.pipe';
import { GoogleService } from '../utils/services/google.service';
import { LoginDto, RegisterDto, loginSchema, registerSchema } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private googleService: GoogleService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() body: LoginDto): Promise<SuccessResponse> {
    const { provider, email, password } = body;

    try {
      if (provider == 'credential') {
        const { id, name, picture } = await this.authService.login({
          email,
          password,
        });

        const access_token = await this.jwtService.signAsync({
          id,
          role: 'user',
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
      }

      throw new ForbiddenException();
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() body: RegisterDto): Promise<SuccessResponse> {
    try {
      if (body.provider == 'credential') {
        await this.authService.register(body);

        return {
          success: true,
          status_code: HttpStatus.CREATED,
          message: 'Register successfully',
        };
      }

      throw new ForbiddenException();
    } catch (error) {
      throw error;
    }
  }

  @UsePipes(new ZodValidationPipe(loginSchema))
  @Post('google')
  async verify(@Body() body: LoginDto) {
    try {
      const { provider, token } = body;

      if (provider == 'google') {
        const payload = await this.googleService.googleVerify(token);

        const { id, name, picture } =
          await this.authService.googleVerify(payload);

        const access_token = await this.jwtService.signAsync({
          id,
          role: 'user',
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
      }

      throw new ForbiddenException();
    } catch (error) {
      throw error;
    }
  }
}
