/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Barracas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Barracas_nome_key" ON "Barracas"("nome");
