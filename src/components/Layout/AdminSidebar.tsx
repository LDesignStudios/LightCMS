"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "../../features/Auth/userMenu/userMenu";
import { User } from "../../utils/types";
import { LogoutButton } from "@/features/Auth/logoutButton";
import { FiHome, FiSettings, FiFileText } from 'react-icons/fi';
import { MdOutlinePushPin } from "react-icons/md";
import data from '@/translations/en/en.json'; 

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
    `flex items-center gap-3 px-4 py-2 rounded-md text-base text-xs font-medium transition-all ${
      isActive(path)
        ? "bg-blue-500/10 border-[0.5px] border-blue-900/10 text-blue-700"
        : "text-gray-800 hover:text-blue-700 hover:bg-gray-100"
    }`;

  const links = [
    { path: "/admin", label: data.navigation.links.dashboard, icon: FiHome },
    { path: "/admin/posts", label: data.navigation.links.posts, icon: MdOutlinePushPin },
    { path: "/admin/system", label: data.navigation.links.system, condition: canManageSystem, icon: FiSettings },
    { path: "/admin/logs", label: data.navigation.links.logs, condition: canViewLogs, icon: FiFileText },
  ];

  return (
    <nav className="bg-white h-screen w-64 shadow-sm border-r border-black/10 flex flex-col justify-between">
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        <div className="space-y-2">
          {links.map((link) => 
            link.condition !== false && (
              <Link key={link.path} href={link.path} className={linkClass(link.path)}>
                {link.icon && <link.icon size={14} />}
                {link.label}
              </Link>
            )
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
