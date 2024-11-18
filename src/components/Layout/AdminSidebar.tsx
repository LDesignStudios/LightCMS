"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "../../features/Auth/userMenu/userMenu";
import { User } from "../../utils/types";
import { LogoutButton } from "@/features/Auth/logoutButton";

interface AdminSidebarProps {
  user?: User;
  canViewUsers?: boolean;
  canManageSystem?: boolean;
  canViewLogs?: boolean;
}

export function AdminSidebar({ user, canManageSystem, canViewLogs }: AdminSidebarProps) {
  const pathname = usePathname();

  if (!user) return null;

  const isActive = (path: string) =>
    path === pathname || (path !== "/admin" && pathname.startsWith(path));

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
      isActive(path)
        ? "bg-blue-500 text-white shadow"
        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white h-screen w-64 shadow-md flex flex-col justify-between">
      {/* Sidebar Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        <div className="space-y-2">
          <Link href="/admin" className={linkClass("/admin")}>
            Dashboard
          </Link>        
          {canManageSystem && (
            <Link href="/admin/system" className={linkClass("/admin/system")}>
              System
            </Link>
          )}
          {canViewLogs && (
            <Link href="/admin/logs" className={linkClass("/admin/logs")}>
              Audit Logs
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="px-4 pb-6 space-y-4">
        <UserMenu
          user={{
            ...user,
            role: user.role.name,
            profilePicture: user.profilePicture ?? null,
            profileColor: user.profileColor ?? null,
          }}
        />
        <LogoutButton/>
      </div>
    </nav>
  );
}
