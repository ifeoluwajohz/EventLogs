-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_pictureId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "pictureId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
