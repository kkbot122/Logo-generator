/* src/app/projects/[id]/page.tsx */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import ProjectInterface from "@/components/ProjectInterface";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const { id } = await params;

  const brand = await prisma.brandIdentity.findUnique({
    where: {
      id: id,
      userId: session.user.id, 
    },
  });

  if (!brand) return notFound();

  return <ProjectInterface brand={brand as any} />;
}