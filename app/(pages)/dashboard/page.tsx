/* src/app/dashboard/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import options from your file
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { checkAndResetCredits } from "@/lib/userLimits";

export default async function DashboardPage() {
  // 1. Check Authentication (v4 style)
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/"); // Redirect to login if not authenticated
  }

  const { credits, plan } = await checkAndResetCredits(session.user.id);
  // 2. Fetch User's Data
  const projects = await prisma.brandIdentity.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      brandName: true,
      createdAt: true,
      logoUrl: true,
    },
  });

  // 3. Render Client Component with Real Data
  return <DashboardClient projects={projects} credits={credits} plan={plan}/>;
}
