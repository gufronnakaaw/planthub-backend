import { Module } from '@nestjs/common';
import { GoogleService } from '../utils/services/google.service';
import { PrismaService } from '../utils/services/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleService, PrismaService],
})
export class AuthModule {}
