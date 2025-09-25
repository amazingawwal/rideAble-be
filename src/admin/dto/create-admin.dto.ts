import { AdminRole } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(AdminRole)
  role: AdminRole;

//   @MinLength(8)
//   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
//     message:
//       'Password must contain uppercase, lowercase, and number/special character',
//   })
  @IsString()
  password: string;
}
