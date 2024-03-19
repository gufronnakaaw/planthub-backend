import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';

@Injectable()
export class BannersService {
  constructor(private prismaService: PrismaService) {}

  getBanners() {
    return this.prismaService.banner.findMany({
      select: {
        id: true,
        url: true,
        alt: true,
      },
    });
  }

  async createBanner(params: { id: string; url: string; alt: string }) {
    await this.prismaService.banner.create({
      data: params,
    });
  }

  async deleteBanner(image_id: string) {
    const check = await this.prismaService.banner.count({
      where: {
        id: image_id,
      },
    });

    if (check < 1) {
      throw new NotFoundException('image not found');
    }

    return this.prismaService.banner.delete({
      where: {
        id: image_id,
      },
    });
  }
}
