import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DriverJWTGuard extends AuthGuard('jwt-driver') {}
