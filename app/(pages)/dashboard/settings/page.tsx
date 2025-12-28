/* src/app/dashboard/settings/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Your auth options import
import SettingsForm from "./SettingsForm"; // We will create this next
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  // 1. Fetch session on the server
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  // 2. Pass user data directly to the client form
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
       <SettingsForm user={session.user} />
    </div>
  );
}