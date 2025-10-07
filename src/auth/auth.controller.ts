import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import ValidationDto from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async validatePassenger(@Body() dto: ValidationDto) {
    const pax = await this.authService.validatePax(dto);
    return this.authService.login(pax);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':email')
  // async getProfile(@Param('email') id:string){
  //   return await this.authService.getProfile(email)
  // }
}
