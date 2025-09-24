/*
  Warnings:

  - You are about to drop the column `adminId` on the `Password` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Password" DROP CONSTRAINT "Password_adminId_fkey";

-- DropIndex
DROP INDEX "public"."Password_adminId_key";

-- AlterTable
ALTER TABLE "public"."Password" DROP COLUMN "adminId";

-- CreateTable
CREATE TABLE "public"."AdminPassword" (
    "id" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "AdminPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminPassword_adminId_key" ON "public"."AdminPassword"("adminId");

-- AddForeignKey
ALTER TABLE "public"."AdminPassword" ADD CONSTRAINT "AdminPassword_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
