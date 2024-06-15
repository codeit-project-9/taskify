'use client';

import BackButton from '@/app/components/BackButton';
import ProfileSetting from '@/app/components/ProfileSetting';
import PasswordChangeForm from '@/app/components/PasswordChangeForm';
import { useDashboardId } from '@/context/DashBoardIdContext';
import { useEffect } from 'react';

export default function MyPage() {
  const { setDashboardID } = useDashboardId();
  useEffect(() => {
    setDashboardID(0);
  }, []);

  return (
    <>
      <div className='flex'>
        <div className='w-full'>
          <div className='bg-custom_gray-_fafafa pb-5'>
            <BackButton link='/mydashboard' />
            <ProfileSetting />
            <PasswordChangeForm />
          </div>
        </div>
      </div>
    </>
  );
}
