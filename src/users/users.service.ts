import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: string) {
    const pax = await this.prisma.passenger.findUnique({
      where: {
        id: id,
      },
    });
    return pax;
  }
}
