import { Body, Controller, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import DriverDto from './dto/driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async createDriver(@Body() dto:DriverDto){
    return await this.driverService.createDriver(dto)
  }

}
