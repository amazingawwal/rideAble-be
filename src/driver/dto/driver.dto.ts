import { DriverStatus } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsPhoneNumber,
  IsDate,
} from 'class-validator';

export default class DriverDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  licenseNumber: string;

  @IsDate()
  licenseExpiry: Date;

  @IsEnum(DriverStatus)
  driverStatus: DriverStatus;
}

export class DriverPayloadDto {
  @IsString()
  sub: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;
}
