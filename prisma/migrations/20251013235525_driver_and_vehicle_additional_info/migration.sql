/*
  Warnings:

  - You are about to drop the column `accessibilityFeatures` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `licenseExpiry` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VehicleYear` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessibilityFeature` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleMake` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleModel` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."AccessibilityFeatures" AS ENUM ('Ramps_and_lifts', 'Wide_door_openings', 'Lowered_floors', 'Swivel_seats', 'Wheelchair_restraints', 'Spacious_interior', 'Customizable_seating', 'Others');

-- AlterTable
ALTER TABLE "public"."Driver" ADD COLUMN     "licenseExpiry" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Vehicle" DROP COLUMN "accessibilityFeatures",
ADD COLUMN     "VehicleYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "accessibilityFeature" "public"."AccessibilityFeatures" NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "vehicleMake" TEXT NOT NULL,
ADD COLUMN     "vehicleModel" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Inactive';
