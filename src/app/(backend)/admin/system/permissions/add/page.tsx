import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import Link from "next/link";
import { PermissionForm } from "@/app/(backend)/admin/system/permissions/_components/PermissionForm"

export default async function AddPermissionPage() {
  const user = await getUser();
  const canManageRoles = await hasPermission(user.id, Permission.MANAGE_ROLES);

  if (!canManageRoles) {
    return null;
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
      
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add New Permission</h1>
        <PermissionForm />
      </div>
    </div>
  );
} 