/*
  Warnings:

  - You are about to drop the column `dealer_id` on the `BackOffice` table. All the data in the column will be lost.
  - You are about to drop the column `dealer_id` on the `Technicians` table. All the data in the column will be lost.
  - You are about to drop the `Ledger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dealerid` to the `BackOffice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dealerid` to the `Technicians` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BackOffice" DROP CONSTRAINT "BackOffice_dealer_id_fkey";

-- DropForeignKey
ALTER TABLE "Ledger" DROP CONSTRAINT "Ledger_dealer_id_fkey";

-- DropForeignKey
ALTER TABLE "Ledger" DROP CONSTRAINT "Ledger_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_dealer_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Technicians" DROP CONSTRAINT "Technicians_dealer_id_fkey";

-- AlterTable
ALTER TABLE "BackOffice" DROP COLUMN "dealer_id",
ADD COLUMN     "dealerid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Technicians" DROP COLUMN "dealer_id",
ADD COLUMN     "dealerid" TEXT NOT NULL;

-- DropTable
DROP TABLE "Ledger";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "PaymentStatus";

-- AddForeignKey
ALTER TABLE "Technicians" ADD CONSTRAINT "Technicians_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "Dealers"("dealer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackOffice" ADD CONSTRAINT "BackOffice_dealerid_fkey" FOREIGN KEY ("dealerid") REFERENCES "Dealers"("dealer_id") ON DELETE CASCADE ON UPDATE CASCADE;
