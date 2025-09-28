import { DisabilityType } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';


export class PassengerDto{
  @IsString()
  name: string ;

  @IsString()
  phone: string ;

  @IsEmail()
  email: string ;

  @IsEnum(DisabilityType)
  disabilityType: DisabilityType ;

  @IsString()
  accessibilityNeeds: string ;

  @IsString()
  password: string ;
}