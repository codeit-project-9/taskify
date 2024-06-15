'use client';

import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useRouter } from 'next/navigation';
import { useDashboardData } from '@/context/DashboardDataContext';
import instance from '@/app/api/axios';

const NewDashboardModal: React.FC = () => {
  const router = useRouter();
  const { dashboardsData, setDashboardsData } = useDashboardData();
  const { closeModal } = useModal();
  const [selectedColor, setSelectedColor] = useState<string>('#7ac555');
  const [dashboardName, setDashboardName] = useState<string>('');

  const handleCloseModal = () => {
    closeModal();
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  /** 입력값 저장 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardName(e.target.value);
  };

  const colors = [
    { name: '#7ac555', bgColor: 'bg-custom_green-_7ac555' },
    { name: '#760dde', bgColor: 'bg-custom_purple' },
    { name: '#ffa500', bgColor: 'bg-custom_orange' },
    { name: '#76a6ea', bgColor: 'bg-custom_blue' },
    { name: '#e876ea', bgColor: 'bg-custom_pink' },
  ];

  /** 대시보드 생성 파라미터 */
  const requestData = {
    title: dashboardName,
    color: selectedColor,
  };

  /** 대시보드 만들기 함수 */
  const onClick = async () => {
    try {
      const response = await instance.post('dashboards', requestData);
      if (response.status >= 200 && response.status < 300) {
        if (dashboardsData.length >= 10) {
          console.log('POST 요청 성공:', response.data);
          setDashboardsData((prev) => {
            const newData = [...prev];
            newData.pop();
            newData.unshift(response.data);
            return newData;
          });
        } else {
          setDashboardsData((prev) => {
            const newData = [...prev];
            newData.unshift(response.data);
            return newData;
          });
        }
        router.push(`/dashboard/${response.data.id}`);
      }
    } catch (e) {
      alert('대시보드 생성에 실패했습니다.');
    } finally {
      closeModal();
    }
  };

  return (
    <div className='flex w-[320px] flex-col sm:w-[540px]'>
      <div className='text-[24px] font-bold text-custom_black-_333236'>
        새로운 대시보드
      </div>
      <div className='mt-[32px]'>
        <div className='text-[18px] text-custom_black-_333236'>
          대시보드 이름
        </div>
        <input
          className='mt-[10px] w-full rounded-md border border-custom_gray-_d9d9d9 px-4 py-4'
          placeholder='뉴프로젝트'
          value={dashboardName}
          onChange={handleInputChange}
        />
      </div>
      <div className='mt-[28px] flex gap-x-3'>
        {colors.map((color) => (
          <div
            key={color.name}
            className={`relative h-[30px] w-[30px] rounded-full ${color.bgColor} cursor-pointer`}
            onClick={() => handleColorClick(color.name)}
          >
            {selectedColor === color.name && (
              <img
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
                src='/images/check.svg'
                alt='check'
              />
            )}
          </div>
        ))}
      </div>
      <div className='mt-5 flex w-full justify-center gap-x-3 sm:justify-end'>
        <button
          className='w-1/2 rounded-md border border-custom_gray-_d9d9d9 bg-custom_white px-[46px] py-[14px] sm:w-auto'
          onClick={handleCloseModal}
        >
          취소
        </button>
        <button
          onClick={onClick}
          className={`w-1/2 rounded-md border-custom_gray-_d9d9d9 bg-custom_violet-_5534da px-[46px] py-[14px] text-white sm:w-auto ${!dashboardName ? 'opacity-20' : ''}`}
          disabled={!dashboardName}
        >
          생성
        </button>
      </div>
    </div>
  );
};

export default NewDashboardModal;
