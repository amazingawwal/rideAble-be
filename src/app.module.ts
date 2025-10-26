import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminModule } from './admin/admin.module';
import { PassengerModule } from './passenger/passenger.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RidesModule } from './rides/rides.module';
import { DriverModule } from './driver/driver.module';
import { OrsModule } from './ors/ors.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AdminModule,
    PassengerModule,
    UsersModule,
    AuthModule,
    RidesModule,
    DriverModule,
    OrsModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
