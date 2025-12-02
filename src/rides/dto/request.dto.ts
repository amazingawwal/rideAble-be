// import { IsArray,  IsNumber, IsString } from 'class-validator';
import { AccessibilityFeatures } from '@prisma/client';

export class RideRequestDto {
  //   @IsArray()
  //   @IsNumber({ each: true })
  pickup: number[];

  //   @IsArray()
  //   @IsNumber({ each: true })
  destination: number[];
  accessibilityFeatures: AccessibilityFeatures[];
}
