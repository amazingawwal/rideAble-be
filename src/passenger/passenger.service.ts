import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassengerDto } from './dto/pax.dto';
import { hashPassword } from 'utils/auth/bcrypt';
// import ValidationDto from 'src/auth/dto/auth.dto';


@Injectable()
export class PassengerService {
  constructor(private readonly prisma: PrismaService) {}

  async createPassenger(dto: PassengerDto) {
    try {
      const hashedPassword = await hashPassword(dto.password);
      return await this.prisma.passenger.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          disabilityType: dto.disabilityType,
          accessibilityNeeds: dto.accessibilityNeeds,
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

  async getPassenger(email: string) {
    try {
      const pax = await this.prisma.passenger.findUnique({
        where: { email },
        include: { password: true },
      });
      if (!pax) {
        throw new NotFoundException('No Passenger Details Found');
      }
      return pax;
    } catch (error: any) {
      return error;
    }
  }
}
