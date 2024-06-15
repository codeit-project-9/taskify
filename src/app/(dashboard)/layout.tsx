'use client';

import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import DashboardHeader from '../components/DashboardHeader';
import DashboardHeaderInSettings from '../components/DashboardHeaderInSettings';
import { UserDataProvider } from '@/context/UserDataContext';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const dashboardId = `${pathname}/edit`;

  const renderHeader = () => {
    if (pathname === '/mydashboard') {
      return <DashboardHeader title={'내 대시보드'} />;
    } else if (
      pathname.startsWith('/dashboard/') &&
      !pathname.endsWith('/edit')
    ) {
      return <DashboardHeaderInSettings link={dashboardId} />;
    } else if (pathname.endsWith('/edit')) {
      return <DashboardHeaderInSettings />;
    } else if (pathname === '/mypage') {
      return <DashboardHeader title={'계정관리'} />;
    } else {
      return null;
    }
  };

  return (
    <UserDataProvider>
      <div className='flex'>
        <SideBar />
        <div className='w-full'>
          {renderHeader()}
          <main>{children}</main>
        </div>
      </div>
    </UserDataProvider>
  );
};

export default DashboardLayout;
