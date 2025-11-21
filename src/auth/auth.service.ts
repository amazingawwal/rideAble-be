import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { comparePassword } from 'utils/auth/bcrypt';
import ValidationDto from './dto/auth.dto';
import { Passenger, Password } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


export type Pax = Passenger & { password: Password };
// type Pass = Pax['password']
export type Payload = {
  sub: Passenger['id'];
  email: Passenger['email'];
  name: Passenger['name'];
};

@Injectable()
export class AuthService {
  constructor(
    private readonly passengerService: PassengerService,
    private jwt: JwtService,
  ) {}

  async validatePax(dto: ValidationDto) {
    try {
      //   const pax: Pax = await this.passengerService.getPassenger(dto.email);
      //   if (!pax) {
      //     throw new NotFoundException();
      //   }
      //   const password = await comparePassword(
      //     dto.password,
      //     pax.password.hashedPassword,
      //   );
      //   if (!password) {
      //     throw new NotFoundException('Invalid Credentials');
      //   }
      //   const payload = {
      //   sub: pax.id,
      //   email: pax.email,
      //   name: pax.name,
      // };
      //   return { pax, access_token: this.jwt.sign(payload) };
      // return pax;
      const pax: Pax = await this.passengerService.getPassenger(dto.email);

      if (
        pax &&
        (await comparePassword(dto.password, pax.password.hashedPassword))
      ) {
        // const { password, ...details } = pax;
        return pax;
      }
      throw new UnauthorizedException('Invalid credentials');
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

  // async getProfile(id:string){
  //   return await this.passengerService.getPassenger(id)
  // }

  async login(pax: Pax) {
    const payload: Payload = {
      sub: pax.id,
      email: pax.email,
      name: pax.name,
    };
    return {
      pax,
      access_token: this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_SIGN_EXP,
      }),
    };
  }
}
