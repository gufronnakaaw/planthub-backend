import { Module } from '@nestjs/common';
import { CloudinaryService } from '../utils/services/cloudinary.service';
import { PrismaService } from '../utils/services/prisma.service';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';

@Module({
  controllers: [BannersController],
  providers: [BannersService, PrismaService, CloudinaryService],
})
export class BannersModule {}
