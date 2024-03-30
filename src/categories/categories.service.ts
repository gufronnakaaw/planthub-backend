import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';
import { CreateCategoriesDto, DeleteCategoriesDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  getCategories() {
    return this.prismaService.category.findMany();
  }

  async createCategories({ name }: CreateCategoriesDto) {
    const check = await this.prismaService.category.findFirst({
      where: {
        name,
      },
    });

    if (check) {
      throw new BadRequestException('Categories already exists');
    }

    await this.prismaService.category.create({
      data: {
        name,
      },
    });
  }

  async deleteCategories(categories_id: DeleteCategoriesDto) {
    const check = await this.prismaService.category.count({
      where: {
        id: categories_id,
      },
    });

    if (check < 1) {
      throw new NotFoundException('Categories not found');
    }

    await this.prismaService.category.delete({
      where: {
        id: categories_id,
      },
    });
  }
}
