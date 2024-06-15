'use client';

import { useEffect, useState } from 'react';
import { LOGIN_TOKEN } from '@/app/api/apiStrings';
import { CheckUserRes } from '@/app/api/apiTypes/userType';
import instance from '@/app/api/axios';
import { useRouter } from 'next/navigation';
import CustomAvatar from './CustomAvatar';
import { useUserData } from '@/context/UserDataContext';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const [user, setUser] = useState<CheckUserRes | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData, setUserData } = useUserData();

  const router = useRouter();

  const handleNicknameClick = () => {
    setShowDropdown(!showDropdown);
  };

  // 로그아웃 부분 custom hook 구분 or 컴포넌트 작성해서 구분 => 로그아웃 버튼 컴포넌트로 분리
  const handleLogout = () => {
    localStorage.removeItem(LOGIN_TOKEN);
    setUser(null);
    setShowDropdown(false);
    router.push('/');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(LOGIN_TOKEN);
    const fetchUserData = async () => {
      try {
        const res = await instance.get('users/me');
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!accessToken) {
      router.push('/');
    }

    fetchUserData();
  }, []);

  return (
    <div className='flex h-[60px] items-center justify-between border-b border-r border-t border-custom_gray-_d9d9d9 py-1'>
      <div className='ml-10 text-lg font-bold text-custom_black-_333236'>
        {title}
      </div>
      <div className='relative'>
        <div
          className='mr-5 flex items-center gap-[8px]'
          onClick={handleNicknameClick}
        >
          {userData && (
            <CustomAvatar
              nickName={userData.nickname}
              profileUrl={userData.profileImageUrl}
              size='medium'
            />
          )}
          <div className='mr-[80px] hidden w-[45px] cursor-pointer truncate sm:block'>
            {userData && userData.nickname}
          </div>
        </div>
        {showDropdown && (
          <div className='absolute right-0 top-full mt-1 w-[70px] rounded border border-gray-300 bg-white shadow-md sm:w-[100px]'>
            <ul>
              <li
                onClick={handleLogout}
                className='cursor-pointer px-1 py-1 text-center text-xs hover:bg-gray-100 sm:text-base'
              >
                로그아웃
              </li>
              <li
                className='cursor-pointer px-1 py-1 text-center text-xs hover:bg-gray-100 sm:text-base'
                onClick={() => router.push('/mypage')}
              >
                마이페이지
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
