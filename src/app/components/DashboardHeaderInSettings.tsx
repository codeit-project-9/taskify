'use client';

import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import InvitationModal from './modals/InvitationModal';
import { useEffect, useState } from 'react';
import { CheckUserRes } from '@/app/api/apiTypes/userType';
import { LOGIN_TOKEN } from '@/app/api/apiStrings';
import instance from '../api/axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckMembersRes } from '../api/apiTypes/membersType';
import CustomAvatar from './CustomAvatar';
import { useDashboardData } from '@/context/DashboardDataContext';

interface DashboardHeaderInSettingsProps {
  link?: string;
}

const DashboardHeaderInSettings = ({
  link,
}: DashboardHeaderInSettingsProps) => {
  const router = useRouter();
  const params = useParams();

  const [user, setUser] = useState<CheckUserRes | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [page, setPage] = useState<number | null>(1);
  const [size, setSize] = useState<number | null>(10);
  const [dashboardId, setDashboardId] = useState<string | string[]>(
    params.dashboardid,
  );
  const [members, setMembers] = useState<CheckMembersRes[]>();
  const [createdByMe, setCreatedByMe] = useState<boolean | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<
    string | null | number
  >(null);
  const { dashboardsData } = useDashboardData();
  const { openModal } = useModal();

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  const handleNicknameClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_TOKEN);
    setUser(null);
    setShowDropdown(false);
    router.push('/');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(LOGIN_TOKEN);

    if (!accessToken) {
      router.push('/');
    }

    const fetchUserData = async () => {
      try {
        const res = await instance.get('users/me');
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDashboardData = async () => {
      try {
        const res = await instance.get(`dashboards/${params.dashboardid}`);
        setTitle(res.data.title);
        setCreatedByMe(res.data.createdByMe);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDashboardMemberData = async () => {
      try {
        const res = await instance.get('members', {
          params: {
            page,
            size,
            dashboardId: params.dashboardid,
          },
        });
        setMembers(res.data.members);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchDashboardData();
    fetchDashboardMemberData();
  }, [params.dashboardid, dashboardsData]);

  return (
    <nav className='flex h-[60px] items-center justify-between border-b'>
      <div className='hidden items-center sm:flex'>
        <span className='ml-10 hidden text-lg font-bold xl:block'>{title}</span>
        {createdByMe === true ? (
          <span className='ml-2 hidden text-yellow-500 xl:block'>
            <Image
              src='/images/createByMe.svg'
              alt='crown'
              width={20}
              height={16}
            />
          </span>
        ) : null}
      </div>
      <div className='mr-4 flex flex-1 items-center justify-end space-x-2'>
        <div className='mr-10 flex space-x-4 text-[14px] text-custom_gray-_787486 sm:text-[16px]'>
          {/* 대시보드 설정페이지에서 비활성화 */}
          <div className='ml-5'>
            {createdByMe === true && link && (
              <Link
                href={link}
                className='flex w-[50px] items-center justify-center rounded-md border bg-white px-2 py-1 sm:w-[88px]'
              >
                <Image
                  className='mr-2 hidden sm:block'
                  src='/images/settings.svg'
                  alt='settings'
                  width={20}
                  height={20}
                />
                <p>관리</p>
              </Link>
            )}
          </div>
          {createdByMe && (
            <button
              className='flex w-[70px] items-center justify-center rounded-md border bg-white px-2 py-1 sm:w-[116px]'
              onClick={() => handleOpenModal(<InvitationModal />)}
            >
              <Image
                className='mr-2 hidden sm:block'
                src='/images/addTaskButton.svg'
                alt='add'
                width={20}
                height={20}
              />
              <p>초대하기</p>
            </button>
          )}
        </div>
        <div className='ml-6 flex items-center sm:-space-x-2'>
          <div className='ml-[100px] flex items-center -space-x-2 sm:ml-0'>
            {members?.map((member: CheckMembersRes, index: number) =>
              index < 4 ? (
                <div
                  key={member.id}
                  onMouseEnter={() => setHoveredMemberId(member.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                >
                  <CustomAvatar
                    nickName={member.nickname}
                    profileUrl={member.profileImageUrl}
                    size='medium'
                  />
                  {hoveredMemberId === member.id && (
                    <div className='absolute rounded border border-gray-300 bg-white p-2 shadow-md'>
                      <ul>
                        {members.map((member) => (
                          <li key={member.id} className='py-1'>
                            {member.nickname}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null,
            )}
            {members && members.length > 4 && (
              <div className='relative z-10'>
                <div className='h-[34px] w-[34px] rounded-full border-2 border-white bg-blue-500 text-white'>
                  <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                    +{members.length - 4}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='h-10 border-r sm:pl-3'></div>
        <div className='relative'>
          <div
            className='flex items-center gap-[8px]'
            onClick={handleNicknameClick}
          >
            {user && (
              <CustomAvatar
                nickName={user?.nickname}
                profileUrl={user.profileImageUrl}
                size='medium'
              />
            )}
            <div className='mr-[80px] hidden w-[45px] cursor-pointer truncate sm:block'>
              {user && user.nickname}
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
    </nav>
  );
};

export default DashboardHeaderInSettings;
