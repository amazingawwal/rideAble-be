/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Password` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Admin" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "public"."Password" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Password_adminId_key" ON "public"."Password"("adminId");

-- AddForeignKey
ALTER TABLE "public"."Password" ADD CONSTRAINT "Password_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
