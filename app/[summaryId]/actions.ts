"use server";

import prisma from "@/utils/db";

export async function fetchSingleSummary(summaryId: string) {
  const response = await prisma.summary.findUnique({
    where: {
      id: summaryId,
    },
  });
  return response;
}
