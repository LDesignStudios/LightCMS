import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { RoleForm } from "@/app/(backend)/admin/settings/roles/_components/RoleForm";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface EditRolePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRolePage({ params }: EditRolePageProps) {
  const { id } = await params;
  const user = await getUser();
  const canManageRoles = await hasPermission(user.id, Permission.MANAGE_ROLES);

  if (!canManageRoles) {
    redirect("/unauthorized");
  }

  const [role, permissions] = await Promise.all([
    prisma.role.findUnique({
      where: { id },
      include: { permissions: true }
    }),
    prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      }
    })
  ]);

  if (!role) {
    redirect("/admin");
  }

  return (
    <div className="">
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Role</h1>
        <RoleForm role={role} permissions={permissions} />
      </div>
    </div>
  );
} 