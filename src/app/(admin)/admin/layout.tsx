import { AdminSidebar } from '@/components/Layout/AdminSidebar';
import { getUser } from '@/utils/getUser';
import type { ReactNode } from 'react';

import { checkUserPermissions } from "@/lib/permissions";


interface AdminLayoutProps {
  children: ReactNode;
}

async function AdminLayout ({ children }: AdminLayoutProps) {
  const user = await getUser();

  const { canManageSystem, canViewLogs } = await checkUserPermissions(user.id);

  return (
    <div className="flex flex-row w-screen min-h-screen">
      <AdminSidebar user={user} canManageSystem={canManageSystem} canViewLogs={canViewLogs}/>
      <div className='w-full'>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

