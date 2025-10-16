import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/pax.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import ValidationDto from 'src/auth/dto/auth.dto';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post('signup')
  async newPassengerSignup(@Body() dto: PassengerDto) {
    return this.passengerService.createPassenger(dto);
  }

  // @Get(':id')
  // async getUser(@Param('id') id: string) {
  //   return await this.passengerService.getUser(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getPassenger(@Param('email') email: string) {
    return await this.passengerService.getPassenger(email);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    console.log('req');
    return req.user; // comes from validate() in JwtStrategy
  }
}
