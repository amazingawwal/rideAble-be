-- CreateEnum
CREATE TYPE "public"."DisabilityType" AS ENUM ('Mobility', 'Sensory', 'Others');

-- CreateEnum
CREATE TYPE "public"."AdminRole" AS ENUM ('Dispatcher', 'Manager', 'Admin');

-- CreateEnum
CREATE TYPE "public"."DriverStatus" AS ENUM ('Available', 'Unavailable', 'Suspended');

-- CreateEnum
CREATE TYPE "public"."VehicleType" AS ENUM ('Car', 'Van', 'Bus');

-- CreateEnum
CREATE TYPE "public"."VehicleStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "public"."RideType" AS ENUM ('Healthcare', 'Personal', 'Work');

-- CreateEnum
CREATE TYPE "public"."RideStatus" AS ENUM ('Requested', 'Assigned', 'In_progress', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('Cash', 'Subsidy', 'Donation', 'Card');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed');

-- CreateEnum
CREATE TYPE "public"."DonorType" AS ENUM ('NGO', 'Government', 'Corporate_CSR', 'Individual');

-- CreateEnum
CREATE TYPE "public"."ContributionType" AS ENUM ('One_Time_Grant', 'Per_Ride_Subsidy', 'Vehicle_Donation');

-- CreateEnum
CREATE TYPE "public"."AccessibilityFeatures" AS ENUM ('Ramps_and_lifts', 'Wide_door_openings', 'Lowered_floors', 'Swivel_seats', 'Wheelchair_restraints', 'Spacious_interior', 'Customizable_seating', 'Others');

-- CreateTable
CREATE TABLE "public"."Passenger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "disabilityType" "public"."DisabilityType" NOT NULL,
    "accessibilityNeeds" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Password" (
    "id" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "status" "public"."DriverStatus" NOT NULL DEFAULT 'Unavailable',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" TEXT NOT NULL,
    "driverEmail" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "type" "public"."VehicleType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "public"."VehicleStatus" NOT NULL DEFAULT 'Inactive',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleMake" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "VehicleYear" TIMESTAMP(3) NOT NULL,
    "accessibilityFeature" "public"."AccessibilityFeatures"[],
    "images" TEXT[],

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ride" (
    "id" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "type" "public"."RideType" NOT NULL,
    "status" "public"."RideStatus" NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "accessNeeds" TEXT,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "donorId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "public"."PaymentMethod" NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."DonorType" NOT NULL,
    "contactEmail" TEXT,
    "phone" TEXT,
    "contributionType" "public"."ContributionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."AdminRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminPassword" (
    "id" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "AdminPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_email_key" ON "public"."Passenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_passengerId_key" ON "public"."Password"("passengerId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phone_key" ON "public"."Driver"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "public"."Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_driverEmail_key" ON "public"."Vehicle"("driverEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_rideId_key" ON "public"."Payment"("rideId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPassword_adminId_key" ON "public"."AdminPassword"("adminId");

-- AddForeignKey
ALTER TABLE "public"."Password" ADD CONSTRAINT "Password_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "public"."Passenger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_driverEmail_fkey" FOREIGN KEY ("driverEmail") REFERENCES "public"."Driver"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ride" ADD CONSTRAINT "Ride_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "public"."Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ride" ADD CONSTRAINT "Ride_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "public"."Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "public"."Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminPassword" ADD CONSTRAINT "AdminPassword_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
