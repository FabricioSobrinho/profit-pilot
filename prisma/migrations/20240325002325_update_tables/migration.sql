/*
  Warnings:

  - You are about to drop the `Barraca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Barraca";

-- CreateTable
CREATE TABLE "Barracas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Barracas_pkey" PRIMARY KEY ("id")
);
