import { Permission } from '@/utils/types';
import { prisma } from './prisma';

export async function hasPermission(userId: string, permission: Permission): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  });

  if (!user) return false;

  return user.role.permissions.some(p => p.name === permission);
}

export async function hasPermissions(userId: string, permissions: Permission[]): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  });

  if (!user) return false;

  return permissions.every(permission => 
    user.role.permissions.some(p => p.name === permission)
  );
}

export async function checkUserPermissions(userId: string) {
  const canViewUsers = await hasPermission(userId, Permission.READ_USER);
  const canManageRoles = await hasPermission(userId, Permission.MANAGE_ROLES);
  const canCreateUser = await hasPermission(userId, Permission.CREATE_USER);
  const canManagePermissions = await hasPermission(userId, Permission.MANAGE_PERMISSIONS);
  const canManageSystem = await hasPermission(userId, Permission.MANAGE_SYSTEM);
  const canViewLogs = await hasPermission(userId, Permission.VIEW_AUDIT_LOGS);
  const canManagePlugins = await hasPermission(userId, Permission.MANAGE_PLUGINS);
  const canManageCollections = await hasPermission(userId, Permission.MANAGE_COLLECTIONS);
  const canEditDatabase = await hasPermission(userId, Permission.EDIT_DATABASE);
  return {
    canViewUsers,
    canManageRoles,
    canCreateUser,
    canManagePermissions,
    canManagePlugins,
    canManageSystem,
    canViewLogs,
    canManageCollections,
    canEditDatabase,
  };
} 