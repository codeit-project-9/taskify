'use client';

import LandingHeader from './components/Landing/LandingHeader';
import LandingMain from './components/Landing/LadingMain';
import LandingFooter from './components/Landing/LandingFooter';
import { redirect } from 'next/navigation';
import { LOGIN_TOKEN } from '@/app/api/apiStrings';
import { useEffect, useState } from 'react';

function checkToken() {
  if (typeof window === undefined) return;
  return window.localStorage.getItem(LOGIN_TOKEN);
}

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const userToken = checkToken();
    if (userToken) redirect('/mydashboard');
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>로딩중...</div>;
  return (
    <div className='bg-custom_black-_000000 text-custom_white'>
      <LandingHeader />
      <LandingMain />
      <LandingFooter />
    </div>
  );
}
