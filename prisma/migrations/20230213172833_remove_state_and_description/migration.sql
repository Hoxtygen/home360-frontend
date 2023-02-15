/*
  Warnings:

  - You are about to drop the column `description` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "description",
DROP COLUMN "state";
