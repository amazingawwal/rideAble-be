import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminModule } from './admin/admin.module';
import { PassengerModule } from './passenger/passenger.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AdminModule, PassengerModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
