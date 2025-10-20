import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import DriverDto from './dto/driver.dto';
import VehicleDto from './dto/vehicle.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DriverPayloadDto } from './dto/driver.dto';
import { DriverJWTGuard } from './guard/driver-jwt.guard';

@Controller('registration')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('driver')
  @UseGuards(JwtAuthGuard)
  async createDriver(@Body() dto: DriverDto) {
    return await this.driverService.createDriver(dto);
  }

  @Post('vehicle')
  @UseGuards(JwtAuthGuard)
  async registerVehicle(@Body() dto: VehicleDto) {
    return await this.driverService.vehicleReg(dto);
  }

  @Post('sign-in')
  async driverSign_in(@Body() dto:DriverPayloadDto){
    return await this.driverService.driverSignin(dto)
  }

  @Get('profile')
  @UseGuards(DriverJWTGuard)
  getProfile(@Request() req: any) {
      // console.log(req);
      return req.user;
    }
}
