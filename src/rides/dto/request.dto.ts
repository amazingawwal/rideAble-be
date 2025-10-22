import { IsArray, IsString } from 'class-validator';

export class RideRequestDto {
  @IsArray()
  @IsString({ each: true })
  pickup: string[];

  @IsArray()
  @IsString({ each: true })
  destination: string[];
}
