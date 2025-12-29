'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkDownloadEligibility } from "@/lib/userLimits";

export async function verifyAndTrackDownload() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const userId = session.user.id;
  const canDownload = await checkDownloadEligibility(userId);

  if (!canDownload) {
    return { success: false, error: "Download limit reached. Upgrade to Pro." };
  }

  // Increment download count
  await prisma.user.update({
    where: { id: userId },
    data: { lifetimeDownloads: { increment: 1 } },
  });

  return { success: true };
}