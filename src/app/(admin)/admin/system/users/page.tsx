import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import { UsersList } from "@/app/(admin)/admin/system/users/_components/UsersList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllUsersNumber } from "@/utils/all";
import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: {
        select: {
          id: true,
          name: true,
          permissions: {
            select: {
              name: true
            }
          }
        }
      },
      profilePicture: true,
      profileColor: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

async function getAllRoles() {
  return prisma.role.findMany({
    include: {
      permissions: true
    }
  });
}

export default async function UsersPage() {
  const user = await getUser();
  const canViewUsers = await hasPermission(user.id, Permission.READ_USER);
  const canCreateUser = await hasPermission(user.id, Permission.CREATE_USER);

  if (!canViewUsers) {
    redirect("/admin");
  }

  const users = await getAllUsers();
  const roles = await getAllRoles();
  const usersCount = await getAllUsersNumber();

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
      
      <Container>
        <Heading className="text-2xl font-bold mb-6">Users Management</Heading>
        <UsersList 
          users={users} 
          roles={roles}
          currentUserId={user.id}
          canCreateUser={canCreateUser}
          usersCount={usersCount}
        />
      </Container>
    </Container>
  );
} 