import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import ValidationDto from '../dto/auth.dto';
import { Passenger } from 'generated/prisma';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const dto: ValidationDto = { email, password };

    const user: Passenger | undefined = await this.authService.validatePax(dto);
    if (!user) {
      throw new UnauthorizedException('Unauthorized. Login error');
    }
    return user;
  }
}
