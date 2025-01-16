-- DropIndex
DROP INDEX "Event_adminId_title_idx";

-- CreateIndex
CREATE INDEX "Event_adminId_title_date_venue_shortDescription_idx" ON "Event"("adminId", "title", "date", "venue", "shortDescription");
