import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { hashPassword, verifyPassword } from '../utils/auth.util';
import { PrismaService } from '../utils/services/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login({ email, password }: LoginDto) {
    const check = await this.prismaService.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        password: true,
      },
    });

    if (!check) {
      throw new BadRequestException('email wrong');
    }

    if (!(await verifyPassword(password, check.password))) {
      throw new BadRequestException('password wrong');
    }

    return {
      id: check.id,
      name: check.name,
      picture: check.picture,
    };
  }

  async register({ email, fullname, password, provider }: RegisterDto) {
    const check = await this.prismaService.user.count({
      where: {
        email,
        provider,
      },
    });

    if (check > 0) {
      throw new BadRequestException('email already exists');
    }

    await this.prismaService.user.create({
      data: {
        email,
        name: fullname,
        password: await hashPassword(password),
        provider,
      },
    });
  }

  async googleVerify(payload: TokenPayload) {
    const { name, email, email_verified, picture, given_name } = payload;

    const check = await this.prismaService.user.findFirst({
      where: {
        email,
        provider: 'google',
      },
      select: {
        id: true,
        picture: true,
      },
    });

    if (check) {
      await this.prismaService.user.update({
        where: {
          id: check.id,
          email,
          provider: 'google',
        },
        data: {
          name,
          email_verified,
          given_name,
        },
      });

      return {
        id: check.id,
        name,
        picture: check.picture,
      };
    }

    const create = await this.prismaService.user.create({
      data: {
        email,
        name,
        email_verified,
        provider: 'google',
        picture,
        given_name,
      },
      select: {
        id: true,
      },
    });

    return {
      id: create.id,
      name,
      picture,
    };
  }
}
