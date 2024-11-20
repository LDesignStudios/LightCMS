"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "../../features/Auth/userMenu/userMenu";
import { User } from "../../utils/types";
import { LogoutButton } from "@/features/Auth/logoutButton";
import { FiHome, FiSettings, FiFileText } from "react-icons/fi";
import { MdOutlinePushPin } from "react-icons/md";
import data from "@/translations/cz/cz.json";
import staticData from "@/translations/static.json";
import Container from "../UI/container";
import Heading from "../UI/heading";

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import Button from "../UI/Button";
import { useState } from "react";

interface AdminSidebarProps {
  user?: User;
  canViewUsers?: boolean;
  canManageSystem?: boolean;
  canViewLogs?: boolean;
}

export function AdminSidebar({
  user,
  canManageSystem,
  canViewLogs,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) return null;

  const isActive = (path: string) =>
    path === pathname || (path !== "/admin" && pathname.startsWith(path));

  const linkClass = (path: string) =>
    `flex flex-row justify-between items-center gap-3 px-4 py-2 rounded-md text-base text-xs font-medium transition-all ${
      isActive(path)
        ? "bg-blue-500/10 border-[0.5px] border-blue-900/10 text-blue-700"
        : "text-gray-800 hover:text-blue-700 hover:bg-gray-100"
    }`;

  const links = [
    {
      path: "/admin",
      label: data.navigation.links.dashboard,
      icon: FiHome,
    },
    {
      path: "/admin/posts",
      label: data.navigation.links.posts,
      icon: MdOutlinePushPin,
      count: 10,
    },
    {
      path: "/admin/system",
      label: data.navigation.links.system,
      condition: canManageSystem,
      icon: FiSettings,
    },
    {
      path: "/admin/logs",
      label: data.navigation.links.logs,
      condition: canViewLogs,
      icon: FiFileText,
      count: 20,
    },
  ];

  return (
    <nav
      className={`bg-neutral-50 h-screen shadow-sm border-r border-black/10 flex flex-col justify-between ${isSidebarOpen ? "w-64" : "w-16"}`}
    >
      <Container className="px-3 py-3">
        <Container className="flex flex-row justify-between items-center mb-6 border-b-[0.75px] border-black/20 pb-2">
          <Heading
            className={`text-xl pl-2 font-bold text-gray-800 ${isSidebarOpen ? "block" : "hidden"}`}
          >
            {staticData.appName}
          </Heading>
          <Button
            variant="ghost"
            size="sm"
            className="text-black"
            onClick={() => setIsSidebarOpen((prevState) => !prevState)}
          >
            <TbLayoutSidebarLeftCollapse size={18} className={`${isSidebarOpen ? "rotate-0": "rotate-180"} duration-200 `} />
          </Button>
        </Container>
        <Container className="space-y-2">
          {links.map(
            (link) =>
              link.condition !== false && (
                <Link
                  key={link.path}
                  href={link.path}
                  className={linkClass(link.path)}
                >
                  <Container className="flex flex-row gap-x-3 items-center">
                    {link.icon && <link.icon size={14} />}
                    {isSidebarOpen && <span>{link.label}</span>}
                  </Container>
                  {isSidebarOpen && link.count && (
                    <span className="ml-2 text-xs text-neutral-500">
                      {link.count}
                    </span>
                  )}
                </Link>
              )
          )}
        </Container>
      </Container>

      <Container className={`${isSidebarOpen ? "px-4 pb-6 space-y-4 ":"p-2"}`}>
        <UserMenu
          user={{
            ...user,
            role: user.role.name,
            profilePicture: user.profilePicture ?? null,
            profileColor: user.profileColor ?? null,
          }}
          showText={isSidebarOpen}
        />
        <LogoutButton showText={isSidebarOpen}/>
      </Container>
    </nav>
  );
}
