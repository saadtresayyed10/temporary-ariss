-- AlterTable
ALTER TABLE "BackOffice" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Technicians" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Wishlist" ADD COLUMN     "isMarked" BOOLEAN NOT NULL DEFAULT false;
