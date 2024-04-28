"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";

export async function fetchSummary() {
  const session = await auth();
  const userEmail = session?.user?.email;

  const response = await prisma.summary.findMany({
    where: {
      userEmail: userEmail as string,
    },
  });

  return response;
}
export async function deleteSummary(summaryId: { summaryId: string }) {
  const id = summaryId.summaryId;
  return prisma.summary.delete({
    where: {
      id,
    },
  });
}
