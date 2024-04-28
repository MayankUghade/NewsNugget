"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";

export default async function saveSumary(
  link: string,
  title: string,
  article: string,
  summary: string
) {
  const session = await auth();
  const userEmail = session?.user?.email;

  const response = await prisma.summary.create({
    data: {
      userEmail: userEmail as string,
      title,
      link,
      article,
      summary,
    },
  });

  return response;
}
