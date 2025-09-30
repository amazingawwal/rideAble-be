import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import ValidationDto from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async validatePassenger(@Body() dto: ValidationDto) {
    const pax = await this.authService.validatePax(dto);
    return pax;
  }
}
