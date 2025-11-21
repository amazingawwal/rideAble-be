import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DriverPayload } from '../driver.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-driver') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.DRIVER_JWT_SECRET!,
    });
  }

  async validate(payload: DriverPayload) {
    // console.log(payload);
    return { userId: payload.sub, email: payload.email, name: payload.phone };
    // return {  email: payload.email };
  }
}
