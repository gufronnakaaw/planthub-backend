import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { AuthMetaData } from '../utils/auth.decorator';
import { SuccessResponse } from '../utils/global.type';
import { AdminGuard } from '../utils/guards/admin.guard';
import { ZodValidationPipe } from '../utils/pipes/zod.pipe';
import { CloudinaryService } from '../utils/services/cloudinary.service';
import { deleteBannerSchema } from './banners.dto';
import { BannersService } from './banners.service';

@Controller('banners')
@UseGuards(AdminGuard)
export class BannersController {
  constructor(
    private bannersService: BannersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @AuthMetaData('SkipAuth')
  async index(): Promise<SuccessResponse> {
    try {
      const data = await this.bannersService.getBanners();

      return {
        success: true,
        status_code: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter(req, file, callback) {
        const ext = extname(file.originalname);
        const extension = ['.jpg', '.png', '.jpeg'];

        if (extension.includes(ext)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('invalid file extension'), false);
        }
      },
    }),
  )
  async store(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: { alt: string },
  ): Promise<SuccessResponse> {
    const { alt } = body;

    if (!alt) {
      throw new Error('alt is required');
    }

    try {
      const { public_id, secure_url } =
        await this.cloudinaryService.upload_stream({
          folder: 'banners',
          buffer: image.buffer,
        });

      const split = public_id.split('/');

      const create = {
        id: split[split.length - 1],
        url: secure_url,
        alt,
      };

      await this.bannersService.createBanner(create);

      return {
        success: true,
        status_code: HttpStatus.CREATED,
        data: create,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':image_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(deleteBannerSchema))
  async destroy(@Param('image_id') image_id: string): Promise<SuccessResponse> {
    try {
      await this.bannersService.deleteBanner(image_id);
      await this.cloudinaryService.delete_resource('banners/' + image_id);

      return {
        success: true,
        status_code: HttpStatus.OK,
        message: 'delete banner successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
