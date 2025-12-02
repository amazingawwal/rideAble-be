import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DriverPayload, DriverService } from '../driver.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-driver') {
  constructor(private readonly driverService: DriverService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.DRIVER_JWT_SECRET!,
    });
  }

  async validate(payload: DriverPayload) {
    const driver = await this.driverService.getUniqueDriver(payload.email);
    // console.log(payload);
    // return { userId: payload.sub, email: payload.email, name: payload.phone };
    return { driver };
  }
}
