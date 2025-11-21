import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrsService } from 'src/ors/ors.service';

@Module({
  controllers: [RidesController],
  providers: [RidesService, PrismaService, OrsService],
})
export class RidesModule {}
