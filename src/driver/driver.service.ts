import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import DriverDto from './dto/driver.dto';
import VehicleDto from './dto/vehicle.dto';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}

  async createDriver(dto: DriverDto) {
    const driver = await this.prisma.driver.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        licenseNumber: dto.licenseNumber,
        licenseExpiry: new Date(dto.licenseExpiry),
      },
    });

    return driver;
  }


  async getUniqueDriver(id:string){
    const driver = await this.prisma.driver.findUnique({where:{
        id
    }})

    if(!driver) {
        throw new NotFoundException('No details found')
    }
    return driver.id
  }

  // validation before proceeding to Vehicle reg.
  // expiry date must be greater than current date or 3 months validity required

  async vehicleReg(dto: VehicleDto){
    const driver = await this.getUniqueDriver(dto.driverId)

    if (!driver){
        throw new BadRequestException("Enter your details on the Drivers' Tab")
    }
    
    const vehicle = await this.prisma.vehicle.create({data:{
        plateNumber : dto.plateNumber,
        type: dto.type,
        capacity: dto.capacity,
        vehicleMake: dto.vehicleMake,
        vehicleModel: dto.vehicleModel,
        images:dto.images,
        VehicleYear: new Date(dto.VehicleYear),
        accessibilityFeature: dto.accessibilityFeature,
        driverId: dto.driverId
    }})

    return vehicle;
  }

}
