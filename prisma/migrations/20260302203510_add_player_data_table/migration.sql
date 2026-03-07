-- CreateTable
CREATE TABLE "PlayerData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "cleared" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PlayerData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerData" ADD CONSTRAINT "PlayerData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
