import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PassengerModule],
})
export class AuthModule {}
