import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import { PermissionForm } from "@/app/(backend)/admin/settings/permissions/_components/PermissionForm"
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

interface EditPermissionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPermissionPage({ params }: EditPermissionPageProps) {
  const { id } = await params;
  const user = await getUser();
  const canManagePermissions = await hasPermission(user.id, Permission.MANAGE_PERMISSIONS);

  if (!canManagePermissions) {
    redirect("/unauthorized");
  }

  const permission = await prisma.permission.findUnique({
    where: { id },
  });

  if (!permission) {
    redirect("/admin");
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Edit Permission</h1>
        <PermissionForm permission={permission} />
      </div>
    </div>
  );
}