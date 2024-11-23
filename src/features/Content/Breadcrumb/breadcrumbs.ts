import { usePathname } from "next/navigation";

export const useBreadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Posts', href: '/admin/posts' },
    { label: 'Users', href: '/admin/system/users' },
    { label: 'Roles', href: '/admin/system/roles' },
    { label: 'Permissions', href: '/admin/system/permissions' },
    // Add more paths as needed
  ];

  const filteredItems = breadcrumbItems.filter(item => pathname.includes(item.href));

  return filteredItems.map((item, index) => ({
    ...item,
    isLast: index === filteredItems.length - 1,
  }));
};