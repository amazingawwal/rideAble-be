import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import DriverDto from './dto/driver.dto';
import VehicleDto from './dto/vehicle.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
}
