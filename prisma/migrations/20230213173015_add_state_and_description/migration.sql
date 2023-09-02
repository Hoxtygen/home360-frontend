/*
  Warnings:

  - Added the required column `description` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
