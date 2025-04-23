-- CreateEnum
CREATE TYPE "RMAStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'RESOLVED');

-- CreateTable
CREATE TABLE "RMA" (
    "rma_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_serial" TEXT NOT NULL,
    "product_issue" TEXT NOT NULL,
    "product_images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RMA_pkey" PRIMARY KEY ("rma_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RMA_email_key" ON "RMA"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RMA_phone_key" ON "RMA"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "RMA_product_serial_key" ON "RMA"("product_serial");
