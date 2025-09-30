import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassengerModule } from 'src/passenger/passenger.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [PassengerModule, PassportModule],
})
export class AuthModule {}
