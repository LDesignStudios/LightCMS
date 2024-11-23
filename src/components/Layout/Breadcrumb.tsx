"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFileText, FiUsers, FiSettings, FiLock, FiLogOut } from 'react-icons/fi'; 

import data from "@/translations/cz/cz.json";

const breadcrumbMap: Record<string, { label: string; icon: JSX.Element }> = {
  '/admin': { label: data.breadcrumb.dashboard, icon: <FiHome /> },
  '/admin/posts': { label: data.breadcrumb.posts , icon: <FiFileText /> },
  '/admin/posts/add-new': { label: data.breadcrumb.add, icon: <FiFileText /> }, 
  '/admin/posts/edit': { label: data.breadcrumb.edit, icon: <FiFileText /> },
  '/admin/pages': { label: data.breadcrumb.pages , icon: <FiFileText /> },
  '/admin/pages/add-new': { label: data.breadcrumb.add, icon: <FiFileText /> },
  '/admin/pages/edit': { label: data.breadcrumb.edit, icon: <FiFileText /> },
  '/admin/system/users': { label: 'Users Management', icon: <FiUsers /> },
  '/admin/system/roles': { label: 'Roles Management', icon: <FiLock /> },
  '/admin/system/permissions': { label: 'Permissions Management', icon: <FiLock /> },
  '/admin/logs': { label: data.breadcrumb.logs, icon: <FiLogOut /> },
  '/admin/settings': { label: data.breadcrumb.settings, icon: <FiSettings /> },
};

export const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean); // Split and filter empty segments

  const breadcrumbItems = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/'); // Construct the href
    const { label, icon } = breadcrumbMap[href] || { label: path.charAt(0).toUpperCase() + path.slice(1), icon: null }; // Fallback to path name
    return {
      label,
      href,
      icon,
      isLast: index === paths.length - 1,
    };
  });

  return (
    <nav className="flex">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {!item.isLast ? (
            <Link href={item.href} className="text-blue-600 hover:underline flex items-center">
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500 flex items-center">
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </span>
          )}
          {index < breadcrumbItems.length - 1 && <span className="mx-2"> &gt; </span>}
        </div>
      ))}
    </nav>
  );
};