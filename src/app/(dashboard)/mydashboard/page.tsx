'use client';

import { useEffect, useState } from 'react';
import { useDashboardId } from '@/context/DashBoardIdContext';
import DashboardCard from '@/app/components/DashboardCard';
import InvitedDashboardListMobile from '@/app/components/InvitedDashboardListMobile';
import InvitedDashboardList from '@/app/components/InvitedDashboarList';

const MyDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { setDashboardID } = useDashboardId();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 640);
      };

      handleResize();
      setDashboardID(0);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className='flex'>
      <div className='w-full bg-custom_gray-_fafafa pb-5 pr-6'>
        <DashboardCard />
        {isMobile ? <InvitedDashboardListMobile /> : <InvitedDashboardList />}
      </div>
    </div>
  );
};

export default MyDashboard;
