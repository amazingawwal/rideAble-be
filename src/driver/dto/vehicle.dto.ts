import {
  VehicleType,
  VehicleStatus,
  AccessibilityFeatures,
} from '@prisma/client';

export default class VehicleDto {
  id: string;
  driverEmail: string;
  plateNumber: string;
  type: VehicleType;
  capacity: number;
  status: VehicleStatus;
  createdAt: Date;
  vehicleMake: string;
  vehicleModel: string;
  VehicleYear: Date;
  accessibilityFeature: AccessibilityFeatures[];
  images: string[];
}
