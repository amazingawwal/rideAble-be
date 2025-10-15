import { Body, Controller, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import DriverDto from './dto/driver.dto';
import VehicleDto from './dto/vehicle.dto';

@Controller('registration')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('driver')
  async createDriver(@Body() dto: DriverDto) {
    return await this.driverService.createDriver(dto);
  }

  @Post('vehicle')
  async registerVehicle(@Body()dto:VehicleDto){
    return await this.driverService.vehicleReg(dto)
  }
}
