import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import { PermissionsList } from "@/app/(admin)/admin/system/permissions/_components/PermissionsList"
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllPermissionsNumber } from "@/utils/all";
import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

async function getAllPermissions() {
  return prisma.permission.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      roles: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
}

export default async function PermissionsPage() {
  const user = await getUser();
  const canManagePermissions = await hasPermission(user.id, Permission.MANAGE_PERMISSIONS);

  if (!canManagePermissions) {
    redirect("/admin");
  }

  const permissions = await getAllPermissions();
  const permisionsCount= await getAllPermissionsNumber();

  return (
    <Container className="p-6 w-full">
      <Container className="mb-6">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Dashboard
        </Link>
      </Container>
      
      <Container className="">
        <Heading className="text-2xl font-bold mb-6">Permissions Management</Heading>
        <PermissionsList 
          permissions={permissions}
          canManagePermissions={canManagePermissions}
          permissionsCount={permisionsCount}
        />
      </Container>
    </Container>
  );
}