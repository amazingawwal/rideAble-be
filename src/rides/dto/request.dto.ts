// import { IsArray,  IsNumber, IsString } from 'class-validator';

export class RideRequestDto {
  //   @IsArray()
  //   @IsNumber({ each: true })
  pickup: number[];

  //   @IsArray()
  //   @IsNumber({ each: true })
  destination: number[];
}
