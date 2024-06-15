'use client';
import EditMenuTitle from './EditMenuTitle';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import instance from '../api/axios';
import { CheckMembersRes } from '../api/apiTypes/membersType';
import SettingChangedModal from './modals/SettingChangedModal';
import { useModal } from '@/context/ModalContext';
import axios from 'axios';
import CustomAvatar from './CustomAvatar';

export default function MemberList({ dashboardid }: { dashboardid: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [memberList, setMemberList] = useState<CheckMembersRes[]>([]);
  const [totalCount, setTotalCount] = useState<number>(10);
  const totalPage = Math.ceil(totalCount / 4);
  const { openModal } = useModal();

  /** 멤버리스트 조회 파라미터 */
  const queryParams = { dashboardId: dashboardid, page: currentPage, size: 4 };

  const handleNextPage = () => {
    if (currentPage * 4 < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  /** 멤버삭제 */
  const onClick = async (id: number) => {
    try {
      const response = await instance.delete(`members/${id}`);
      if (response.status >= 200 && response.status < 300) {
        handleOpenModal(
          <SettingChangedModal>멤버가 삭제되었습니다.</SettingChangedModal>,
        );
        setMemberList(
          (prev) => prev?.filter((member) => member.id !== id) || null,
        );
      }
    } catch (e: unknown) {
      //변경실패시
      if (axios.isAxiosError(e)) {
        const error = e.response?.data.message; // 에러발생시 메시지 저장
        handleOpenModal(<SettingChangedModal>{error}</SettingChangedModal>);
      }
    }
  };

  /** 멤버리스트 조회 */
  useEffect(() => {
    const fetchMembersData = async () => {
      const res = await instance.get('members', {
        params: queryParams,
      });
      setMemberList(res.data.members);
      setTotalCount(res.data.totalCount);
    };
    fetchMembersData();
  }, []);

  return (
    <div className='m-5 w-[620px] rounded-lg bg-custom_white max-xl:w-auto max-xl:max-w-[620px] max-sm:mx-3'>
      <EditMenuTitle
        title='구성원'
        subtitle='이름'
        currentPage={currentPage}
        totalPage={totalPage}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
      <div className='flex flex-col px-[28px] pb-[28px]'>
        <div>
          {memberList.map((member) => {
            return (
              <div
                key={member.id}
                className='text-black-_333236 stroke-gray-_eeeeee flex flex-shrink-0 items-center justify-between border-b stroke-1 py-4'
              >
                <div className='flex items-center gap-3 max-sm:text-sm'>
                  <CustomAvatar
                    profileUrl={member.profileImageUrl}
                    nickName={member.nickname}
                    size='medium'
                  />
                  {member.nickname}
                </div>
                <button
                  className='w-21 border-gray-D9D9D9 text-violet-_5534da font-Pretendard flex h-8 flex-shrink-0 items-center justify-center gap-2.5 rounded border bg-white px-7 py-1.5 text-base text-sm font-medium max-sm:w-[52px] max-sm:px-2 max-sm:text-xs'
                  onClick={() => onClick(member.id)}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
