import { DriverStatus } from "generated/prisma"


export default class DriverDto{
  name         : string
  phone        : string
  email        : string
  licenseNumber: string
  licenseExpiry: Date
  driverStatus : DriverStatus
}