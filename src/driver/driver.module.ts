import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/driver-jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [DriverController],
  providers: [DriverService, PrismaService, JwtStrategy],
    imports: [
      PassportModule,
      JwtModule.register({}),
    ],
})
export class DriverModule {}
