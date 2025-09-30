import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { comparePassword } from 'utils/auth/bcrypt';
import ValidationDto from './dto/auth.dto';
// import { Passenger, Password } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Passenger, Password } from 'generated/prisma';

export type Pax = Passenger & { password: Password };
// type Pass = Pax['password']

@Injectable()
export class AuthService {
  constructor(
    private readonly passengerService: PassengerService,
    private jwt: JwtService,
  ) {}

  async validatePax(dto: ValidationDto) {
    try {
      const pax: Pax = await this.passengerService.getPassenger(dto.email);
      if (!pax) {
        throw new NotFoundException();
      }
      const password = await comparePassword(
        dto.password,
        pax.password.hashedPassword,
      );
      if (!password) {
        throw new NotFoundException('Invalid Credentials');
      }
      return pax;
    } catch (error) {
      if (
        error instanceof ForbiddenException ||
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
    }
  }

  async login(pax: Pax) {
    const payload = {
      sub: pax.id,
      email: pax.email,
      name: pax.name,
    };
    return { access_token: this.jwt.sign(payload) };
  }
}
