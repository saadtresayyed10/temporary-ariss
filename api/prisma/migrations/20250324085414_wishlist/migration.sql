-- CreateTable
CREATE TABLE "Wishlist" (
    "wishlist_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "dealer_id" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("wishlist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_product_id_key" ON "Wishlist"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_dealer_id_key" ON "Wishlist"("dealer_id");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealers"("dealer_id") ON DELETE CASCADE ON UPDATE CASCADE;
