import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import DriverDto from './dto/driver.dto';
import VehicleDto from './dto/vehicle.dto';
import { JwtService } from '@nestjs/jwt';
import { Driver } from '@prisma/client';

export type DriverPayload = {
  sub: Driver['id'];
  email: Driver['email'];
  phone: Driver['phone'];
};

@Injectable()
export class DriverService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async createDriver(dto: DriverDto) {
    try {
      const driver = await this.prisma.driver.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          licenseNumber: dto.licenseNumber,
          licenseExpiry: new Date(dto.licenseExpiry),
        },
      });

      return driver;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Record already exist');
      }
    }
  }

  async getUniqueDriver(email: string) {
    const driver = await this.prisma.driver.findUnique({
      where: {
        email,
      },
    });

    if (!driver) {
      throw new NotFoundException('No details found');
    }
    return driver.id;
  }

  // validation before proceeding to Vehicle reg.
  // expiry date must be greater than current date or 3 months validity required

  async vehicleReg(dto: VehicleDto) {
    try {
      await this.getUniqueDriver(dto.driverEmail);

      const vehicle = await this.prisma.vehicle.create({
        data: {
          plateNumber: dto.plateNumber,
          type: dto.type,
          capacity: dto.capacity,
          vehicleMake: dto.vehicleMake,
          vehicleModel: dto.vehicleModel,
          images: dto.images,
          VehicleYear: new Date(dto.VehicleYear),
          accessibilityFeature: dto.accessibilityFeature,
          driverEmail: dto.driverEmail,
        },
      });

      return vehicle;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Record already exist');
      } else if (
        error instanceof ForbiddenException ||
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
    }
  }

  // async validateDriver(){

  // }

  async driverSignin(driver: DriverPayload) {
    await this.getUniqueDriver(driver.email);

    const driverPayload = {
      sub: driver.sub,
      email: driver.email,
      phone: driver.phone,
    };

    return {
      driver,
      access_token: this.jwt.sign(driverPayload, {
        secret: process.env.DRIVER_JWT_SECRET,
        expiresIn: process.env.DRIVER_JWT_SIGN_EXP,
      }),
    };
  }
}
