-- CreateTable
CREATE TABLE "Summary" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);
