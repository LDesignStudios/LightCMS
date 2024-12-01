"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "../../utils/types";
import { LogoutButton } from "@/features/Auth/logoutButton";
import { FiHome, FiFileText } from "react-icons/fi";
import { MdOutlinePushPin } from "react-icons/md";
import data from "@/translations/cz/cz.json";
import staticData from "@/translations/static.json";
import Container from "../UI/container";
import Heading from "../UI/heading";

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import Button from "../UI/Button";
import { useState } from "react";
import { LuFile } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { SiDatabricks } from "react-icons/si";

interface AdminSidebarProps {
  user?: User;
  postsCount: number
  canViewUsers?: boolean;
  canManagePlugins?: boolean;
  canManageSystem?: boolean;
  canViewLogs?: boolean;
  canViewCollections?: boolean;
}

export function AdminSidebar({
  user,
  postsCount,
  canManagePlugins,
  canViewLogs,
  canViewCollections,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) return null;

  const isActive = (path: string) =>
    path === pathname || (path !== "/admin" && pathname.startsWith(path));

  const linkClass = (path: string) =>
    `flex flex-row justify-between items-center gap-x-3 px-4 py-2 rounded-md text-base text-xs font-medium transition-all ${
      isActive(path)
        ? "bg-blue-500/10 border-[0.5px] border-blue-900/10 text-blue-700"
        : "text-gray-800 hover:text-blue-700 hover:bg-gray-100"
    }`;

  const links = [
    {
      label: data.navigation.links.dashboard,
      icon: FiHome,
      path: "/admin",
      isVisible: true
    },
    {
      label: "",
      isHeader: true,
    },
    {
      path: "/admin/posts",
      label: data.navigation.links.posts,
      icon: MdOutlinePushPin,
      count: postsCount,
      isVisible: true
    },  
    {
      path: "/admin/pages",
      label: data.navigation.links.pages,
      icon: LuFile,      
      isVisible: false
    },    
    {
      path: "/admin/collections",
      label: data.navigation.links.collections,
      condition: canViewCollections,
      icon: SiDatabricks, 
      isVisible: true    
    },
    /*
    {
      label: data.navigation.links.title.system,
      isHeader: true,
    },
    */
    {
      path: "/admin/logs",
      label: data.navigation.links.logs,
      condition: canViewLogs,
      icon: FiFileText,  
      isVisible: false 
    },
    {
      path: "/admin/plugins",
      label: data.navigation.links.plugins,
      condition: canManagePlugins,
      icon: IoExtensionPuzzleOutline,      
      isVisible: false
    },   
    {
      path: "/admin/settings",
      label: data.navigation.links.settings,
      condition: canViewLogs,
      icon: IoMdSettings,      
      isVisible: true
    },       
  ];

  return (
    <nav
      className={`bg-neutral-50 h-screen max-h-screen sticky top-0 shadow-sm border-r border-black/10 flex flex-col justify-between ${isSidebarOpen ? "w-64" : ""}`}
    >
      <Container className="px-3 py-3">
        <Container className="flex flex-row justify-between items-center  mb-3 py-2">
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
          {links.map((link) => {
            if (link.isHeader) {
              return (
                <span key={link.label} className="text-gray-600 font-medium uppercase text-xs mt-8">
                  {link.label}
                </span>
              );
            }
            return (
              link.condition !== false && link.isVisible == true && (
                <Link
                  key={link.path}
                  href={link.path || '/'}
                  className={linkClass(link.path || '/')}
                >
                  <Container className="flex flex-row  items-center">
                    {link.icon && <link.icon size={14} />}
                    {isSidebarOpen && <span className="ml-2">{link.label}</span>}
                  </Container>
                  {isSidebarOpen && link.count && (
                    <span className="ml-2 text-xs text-neutral-500">
                      {link.count}
                    </span>
                  )}
                </Link>
              )
            );
          })}
        </Container>
      </Container>

      <Container className={`${isSidebarOpen ? "px-4 pb-6 space-y-4 ":"p-2"}`}>       
        <LogoutButton showText={isSidebarOpen}/>
      </Container>
    </nav>
  );
}
