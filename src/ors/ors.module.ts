import { Module } from '@nestjs/common';
import { OrsService } from './ors.service';
import { OrsController } from './ors.controller';

@Module({
  controllers: [OrsController],
  providers: [OrsService],
})
export class OrsModule {}
