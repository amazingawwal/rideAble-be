import { BadRequestException, Injectable } from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { comparePassword } from 'utils/auth/bcrypt';
import ValidationDto from './dto/auth.dto';
// import { Passenger, Password } from 'generated/prisma';


// export type Pax = Passenger & Password;
// type Pass = Pax[Password]


@Injectable()
export class AuthService {
  constructor(private readonly passengerService: PassengerService) {}

  async validatePax(dto: ValidationDto) {
    try {
      const pax = await this.passengerService.getPassenger(dto.email);
      const password = await comparePassword(
        dto.password,
        pax.password.hashedPassword,
      );
      if (!pax || !password) {
        throw new BadRequestException('Invalid Login Credentials');
      }
      return pax;
    } catch (error) {
      throw new BadRequestException(error,'Invalid Login Credentials');
    }
  }
}
