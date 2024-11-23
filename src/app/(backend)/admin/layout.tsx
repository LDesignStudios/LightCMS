import { AdminSidebar } from '@/components/Layout/AdminSidebar';
import { getUser } from '@/utils/getUser';
import type { ReactNode } from 'react';

import { checkUserPermissions } from "@/lib/permissions";
import Container from '@/components/UI/container';
import { getUsersPostsCount } from '@/features/Content/Posts/Posts/getUsersPosts';
import Navbar from '@/components/Layout/Navbar';

interface AdminLayoutProps {
  children: ReactNode;
}

async function AdminLayout ({ children }: AdminLayoutProps) {
  const user = await getUser();
  const postsCount = await getUsersPostsCount();

  const { canManageSystem, canViewLogs, canManagePlugins } = await checkUserPermissions(user.id);

  return (
    <Container className="flex flex-row w-screen min-h-screen">
      <AdminSidebar user={user} postsCount={postsCount} canManagePlugins={canManagePlugins} canManageSystem={canManageSystem} canViewLogs={canViewLogs}/>
      <Container className='w-full'>      
        <Navbar/>       
        <div className='p-4'>
        {children}
          </div>         
      </Container>
    </Container>
  );
};

export default AdminLayout;

