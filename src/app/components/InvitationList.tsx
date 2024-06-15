'use client';

import { useEffect, useState } from 'react';
import EditMenuTitle from './EditMenuTitle';
import { mockData } from './mockdata/InvitationMock';
import Image from 'next/image';
import instance from '@/app/api/axios';
import { useModal } from '@/context/ModalContext';
import SettingChangedModal from './modals/SettingChangedModal';
import axios from 'axios';
import InvitationModal from './modals/InvitationModal';
import { useInvitationData } from '@/context/InvitationDataContext';

export default function InvitationList({
  dashboardid,
}: {
  dashboardid: number;
}) {
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(10);
  const totalPage = Math.ceil(totalCount / 5) || 1;

  /** 대시보드 조회 파라미터 */
  const queryParams = { page: currentPage, size: 5 };
  const { invitationData, setInvitationData } = useInvitationData(); // 초대내역 컨텍스트

  const handleNextPage = () => {
    if (currentPage * 5 < mockData.length) {
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

  /** 초대내역 삭제 */
  const onClick = async (id: number) => {
    const link = `dashboards/${dashboardid}/invitations/${id}`;
    try {
      const response = await instance.delete(link);
      if (response.status >= 200 && response.status < 300) {
        handleOpenModal(
          <SettingChangedModal>초대가 취소되었습니다.</SettingChangedModal>,
        );
        setInvitationData(
          (prev) =>
            prev?.filter((invitation) => invitation.id !== id) || undefined,
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

  /** 초대내역 조회 */
  useEffect(() => {
    const fetchInvitationListData = async () => {
      const res = await instance.get(`dashboards/${dashboardid}/invitations`, {
        params: queryParams,
      });
      setInvitationData(res.data.invitations);
      setTotalCount(res.data.totalCount);
    };

    fetchInvitationListData();
  }, [currentPage]);

  return (
    <div className='m-5 w-[620px] rounded-lg bg-custom_white max-xl:w-auto max-xl:max-w-[620px] max-sm:mx-3'>
      <div className='relative flex'>
        <EditMenuTitle
          title='초대 내역'
          subtitle='이메일'
          currentPage={currentPage}
          totalPage={totalPage}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
        <button
          className='font-Pretendard max-sm:text-sx mt-8 flex h-8 w-[105px] items-center gap-2 rounded-md bg-custom_violet-_5534da px-3 py-2 text-base font-medium text-white max-sm:absolute max-sm:bottom-4 max-sm:right-7 max-sm:text-xs'
          onClick={() => handleOpenModal(<InvitationModal />)}
        >
          <div className='relative h-4 w-4 max-sm:h-3.5 max-sm:w-3.5'>
            <Image
              fill
              src='/images/inviteMemberButton.svg'
              alt='초대하기 버튼'
            />
          </div>
          초대하기
        </button>
      </div>
      <div className='flex flex-col px-[28px] pb-[28px]'>
        {invitationData.length > 0 ? (
          <div>
            {invitationData.map((email) => {
              return (
                <div
                  key={email.id}
                  className='text-black-_333236 stroke-gray-_eeeeee flex flex-shrink-0 items-center justify-between border-b stroke-1 py-4'
                >
                  <div className='flex items-center gap-3 max-sm:text-sm'>
                    {email.invitee.email}
                  </div>
                  <button
                    className='w-21 border-gray-D9D9D9 text-violet-_5534da font-Pretendard flex h-8 flex-shrink-0 items-center justify-center gap-2.5 rounded border bg-white px-7 py-1.5 text-base text-sm font-medium max-sm:w-[52px] max-sm:px-2 max-sm:text-xs'
                    onClick={() => onClick(email.id)}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-xs text-custom_gray-_9fa6b2'>
            <div className='relative h-[100px] w-[100px]'>
              <Image
                fill
                src='/images/no_invitation.svg'
                alt='초대내역이 없습니다'
              />
            </div>
            <div>아직 초대내역이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
}
