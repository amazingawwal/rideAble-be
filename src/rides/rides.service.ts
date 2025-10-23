import { BadRequestException, Injectable } from '@nestjs/common';
import { OrsService } from 'src/ors/ors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RideRequestDto } from './dto/request.dto';

@Injectable()
export class RidesService {
  constructor(
    private prisma: PrismaService,
    private orsService: OrsService,
  ) {}

  async requestRide(
    data: RideRequestDto,
    // accessibility?: string;
  ) {
    if (!data.pickup || !data.destination) {
      throw new BadRequestException('Pickup and destination are required');
    }

    // 🧭 Get route details from ORS
    const route = await this.orsService.getRoute(data);
    return route;
  }
}
