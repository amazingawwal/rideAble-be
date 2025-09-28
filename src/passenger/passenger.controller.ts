import { Body, Controller, Post } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/pax.dto';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post('signup')
  async newPassengerSignup(@Body()dto:PassengerDto){
    return this.passengerService.createPassenger(dto)
  }
}
