import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService, PrismaService],
})
export class PassengerModule {}
