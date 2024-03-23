import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword, verifyPassword } from '../utils/auth.util';
import { PrismaService } from '../utils/services/prisma.service';
import { LoginAdminDto, RegisterAdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async login({ email, password }: LoginAdminDto) {
    const check = await this.prismaService.admin.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        picture: true,
        name: true,
      },
    });

    if (!check) {
      throw new BadRequestException('email or password wrong');
    }

    if (!(await verifyPassword(password, check.password))) {
      throw new BadRequestException('email or password wrong');
    }

    return {
      id: check.id,
      name: check.name,
      picture: check.picture,
    };
  }

  async register(params: RegisterAdminDto) {
    const check = await this.prismaService.admin.count({
      where: {
        email: params.email,
      },
    });

    if (check > 0) {
      throw new BadRequestException('Email already exists');
    }

    await this.prismaService.admin.create({
      data: {
        email: params.email,
        password: await hashPassword(params.password),
        name: params.name,
      },
    });
  }
}
