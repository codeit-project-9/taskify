'use client';

import instance from '@/app/api/axios';
import { useModal } from '@/context/ModalContext';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useInvitationData } from '@/context/InvitationDataContext';

const InvitationModal: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const { closeModal } = useModal();
  const params = useParams();
  const { invitationData, setInvitationData } = useInvitationData(); // 초대내역 컨텍스트

  const handleCloseModal = () => {
    closeModal();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInvitation = async () => {
    /** 초대 시 이메일이 초대내역에 있는지 확인하는 함수 */
    const isEmailExists = invitationData.some(
      (invitation) => invitation.invitee.email === email,
    );

    if (!email || isEmailExists) {
      if (isEmailExists) {
        alert('이미 초대한 멤버입니다.');
      }
      return null;
    }

    try {
      const response = await instance.post(
        `dashboards/${params.dashboardid}/invitations`,
        {
          email,
        },
      );
      if (response.status >= 200 && response.status < 300) {
        setInvitationData((prev) => {
          const newData = [response.data, ...prev];
          const limitedData = newData.slice(0, 5);
          return limitedData;
        });
        closeModal();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        console.log('알 수 없는 에러가 발생했습니다.', error);
      }
    }
  };

  return (
    <div className='flex w-[320px] flex-col sm:w-[540px]'>
      <div className='text-[24px] font-bold text-custom_black-_333236'>
        초대하기
      </div>
      <div className='mt-[32px]'>
        <div className='text-[18px] text-custom_black-_333236'>이메일</div>
        <input
          className='mt-[10px] w-full rounded-md border border-custom_gray-_d9d9d9 px-4 py-4'
          placeholder='codeit@codeit.com'
          type='email'
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className='mt-5 flex w-full justify-center gap-x-3 sm:justify-end'>
        <button
          className='w-1/2 rounded-md border border-custom_gray-_d9d9d9 bg-custom_white px-[46px] py-[14px] sm:w-auto'
          onClick={handleCloseModal}
        >
          취소
        </button>
        <button
          className={`w-1/2 rounded-md border-custom_gray-_d9d9d9 bg-custom_violet-_5534da px-[46px] py-[14px] text-white sm:w-auto ${!email ? 'opacity-20' : ''}`}
          onClick={handleInvitation}
          disabled={!email}
        >
          초대
        </button>
      </div>
    </div>
  );
};

export default InvitationModal;
