/*
  Warnings:

  - Added the required column `business_name` to the `RMA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gstin` to the `RMA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RMA" ADD COLUMN     "business_name" TEXT NOT NULL,
ADD COLUMN     "gstin" TEXT NOT NULL;
