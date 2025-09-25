import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
// import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'utils/auth/bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword = await hashPassword(createAdminDto.password);
      return await this.prisma.admin.create({
        data: {
          name: createAdminDto.name,
          email: createAdminDto.email,
          role: createAdminDto.role,
          password: {
            create: {
              hashedPassword: hashedPassword,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Record already exist');
      }
    }
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: string) {
    return this.prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        password: true,
      },
    });
  }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
