import { AdminSidebar } from '@/components/Layout/AdminSidebar';
import { getUser } from '@/utils/getUser';
import type { ReactNode } from 'react';

import { checkUserPermissions } from "@/lib/permissions";
import Container from '@/components/UI/container';

interface AdminLayoutProps {
  children: ReactNode;
}

async function AdminLayout ({ children }: AdminLayoutProps) {
  const user = await getUser();

  const { canManageSystem, canViewLogs } = await checkUserPermissions(user.id);

  return (
    <Container className="flex flex-row w-screen min-h-screen">
      <AdminSidebar user={user} canManageSystem={canManageSystem} canViewLogs={canViewLogs}/>
      <Container className='w-full'>
        {children}
      </Container>
    </Container>
  );
};

export default AdminLayout;

