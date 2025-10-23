import { Body, Controller, Post } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RideRequestDto } from './dto/request.dto';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('request')
  async rideRequest(@Body() dto: RideRequestDto) {
    return this.ridesService.requestRide(dto);
  }
}
