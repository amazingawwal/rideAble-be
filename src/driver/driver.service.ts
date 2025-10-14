import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import DriverDto from './dto/driver.dto';

@Injectable()
export class DriverService {
    constructor( private readonly prisma: PrismaService){}


    async createDriver(dto:DriverDto){
        const driver = await this.prisma.driver.create({data:{ 
            name  : dto.name,  
            email : dto.email,
            phone : dto.phone,
            licenseNumber : dto.licenseNumber,
            licenseExpiry : dto.licenseExpiry,
        }})

        return driver;
    }
}
