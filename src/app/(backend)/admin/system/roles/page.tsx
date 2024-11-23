import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import { RolesList } from "@/app/(backend)/admin/system/roles/_components/RolesList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllRolesNumber } from "@/utils/all";
import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

async function getAllRoles() {
  return prisma.role.findMany({
    include: {
      permissions: true
    }
  });
}

export default async function RolesPage() {
  const user = await getUser();
  const canViewRoles = await hasPermission(user.id, Permission.MANAGE_ROLES);
  const canManageRoles = await hasPermission(user.id, Permission.MANAGE_ROLES);

  if (!canViewRoles) {
    redirect("/admin");
  }

  const rolesCount= await getAllRolesNumber();

  const roles = await getAllRoles();

  return (
    <Container>
      <Container className="mb-6">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Dashboard
        </Link>
      </Container>
      
      <Container>
        <Heading className="text-2xl font-bold mb-6">Roles Management</Heading>
        <RolesList 
          roles={roles}
          canManageRoles={canManageRoles}
          rolesCount={rolesCount}
        />
      </Container>
    </Container>
  );
}