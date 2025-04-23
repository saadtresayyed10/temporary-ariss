-- AlterTable
ALTER TABLE "Dealers" ADD COLUMN     "isDistributor" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RMA" ADD COLUMN     "status" "RMAStatus" NOT NULL DEFAULT 'PENDING';
