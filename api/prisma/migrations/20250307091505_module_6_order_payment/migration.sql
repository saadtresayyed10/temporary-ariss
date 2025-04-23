/*
  Warnings:

  - You are about to drop the column `code` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `discount_value` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `max_order_value` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `min_order_value` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the `DealerCoupon` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dealer_id,product_id]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coupon_code` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dealer_id` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Made the column `expiry_date` on table `Discount` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `product_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'DISPATCHED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('ONLINE', 'CREDIT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "DealerCoupon" DROP CONSTRAINT "DealerCoupon_dealer_id_fkey";

-- DropForeignKey
ALTER TABLE "DealerCoupon" DROP CONSTRAINT "DealerCoupon_discount_id_fkey";

-- DropIndex
DROP INDEX "Discount_code_key";

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "code",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "discount_value",
DROP COLUMN "max_order_value",
DROP COLUMN "min_order_value",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "coupon_code" TEXT NOT NULL,
ADD COLUMN     "dealer_id" TEXT NOT NULL,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "percentage" DOUBLE PRECISION,
ADD COLUMN     "product_id" TEXT NOT NULL,
ALTER COLUMN "expiry_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "product_price" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "DealerCoupon";

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "payment_mode" "PaymentMode" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dealer_id" TEXT,
    "product_id" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" TEXT NOT NULL,
    "transaction_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Ledger" (
    "ledger_id" TEXT NOT NULL,
    "total_due" DOUBLE PRECISION NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "balance_due" DOUBLE PRECISION NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dealer_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("ledger_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_order_id_key" ON "Payment"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_order_id_key" ON "Ledger"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Discount_dealer_id_product_id_key" ON "Discount"("dealer_id", "product_id");

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealers"("dealer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealers"("dealer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealers"("dealer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;
