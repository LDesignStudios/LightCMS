import Sidebar from '@/components/Layout/Sidebar';
import type { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-row w-screen min-h-screen">
      <Sidebar />
      <div className=''>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

