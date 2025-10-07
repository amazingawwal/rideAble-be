import { IsEmail, IsString } from 'class-validator';

export default class ValidationDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
