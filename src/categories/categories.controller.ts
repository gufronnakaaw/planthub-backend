import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SuccessResponse } from '../utils/global.type';
import { AdminGuard } from '../utils/guards/admin.guard';
import { ZodValidationPipe } from '../utils/pipes/zod.pipe';
import {
  CreateCategoriesDto,
  DeleteCategoriesDto,
  createCategoriesSchema,
  deleteCategoriesSchema,
} from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
@UseGuards(AdminGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async index(): Promise<SuccessResponse> {
    try {
      const data = await this.categoriesService.getCategories();

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
  @UsePipes(new ZodValidationPipe(createCategoriesSchema))
  async store(@Body() body: CreateCategoriesDto): Promise<SuccessResponse> {
    try {
      await this.categoriesService.createCategories(body);

      return {
        success: true,
        status_code: HttpStatus.CREATED,
        message: 'Create categories successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':categories_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(deleteCategoriesSchema))
  async destroy(
    @Param('categories_id') categories_id: DeleteCategoriesDto,
  ): Promise<SuccessResponse> {
    try {
      await this.categoriesService.deleteCategories(categories_id);
      return {
        success: true,
        status_code: HttpStatus.OK,
        message: 'Delete categories successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
