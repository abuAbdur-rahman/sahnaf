// app/admin/layout.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { isAuthorized } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard | Sahnaf Global Tech",
  description: "Manage your shop inventory and content",
};

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    isAdmin: boolean;
  };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session;

  // Check if user is authenticated and is the admin
  if (!session || !isAuthorized(session.user?.email)) {
    redirect("/auth/signin");
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
