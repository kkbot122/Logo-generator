import { prisma } from "@/lib/prisma";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
const FREE_WEEKLY_LIMIT = 2;
const FREE_DOWNLOAD_LIMIT = 2;

export async function checkAndResetCredits(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true, lastCreditReset: true, plan: true },
  });

  if (!user) throw new Error("User not found");

  // If Pro, they always have credits (or return distinct logic)
  if (user.plan === "PRO") {
    return { allowed: true, credits: 999, plan: "PRO" };
  }

  const now = new Date();
  const timeSinceReset = now.getTime() - new Date(user.lastCreditReset).getTime();

  // 1. Check if a week has passed. If so, RESET credits.
  if (timeSinceReset > WEEK_IN_MS) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: FREE_WEEKLY_LIMIT,
        lastCreditReset: now,
      },
    });
    return { allowed: true, credits: FREE_WEEKLY_LIMIT, plan: "FREE" };
  }

  // 2. Check if they have credits left
  if (user.credits > 0) {
    return { allowed: true, credits: user.credits, plan: "FREE" };
  }

  return { allowed: false, credits: 0, plan: "FREE" };
}

export async function checkDownloadEligibility(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lifetimeDownloads: true, plan: true },
  });

  if (!user) return false;
  if (user.plan === "PRO") return true;

  return user.lifetimeDownloads < FREE_DOWNLOAD_LIMIT;
}