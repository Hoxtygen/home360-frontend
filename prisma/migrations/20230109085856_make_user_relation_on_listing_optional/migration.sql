-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_agent_id_fkey";

-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "agent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
