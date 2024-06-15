'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import NewDashboardModal from './modals/NewDashboardModal';
import { useDashboardData } from '@/context/DashboardDataContext';
import { useDashboardId } from '@/context/DashBoardIdContext';
import instance from '@/app/api/axios';
import clsx from 'clsx'; // 조건부 스타일링 라이브러리

type ColorPalette = {
  [key: string]: string;
};

const ColorPalette: ColorPalette = {
  '#7ac555': 'bg-custom_green-_7ac555',
  '#760dde': 'bg-custom_purple',
  '#ffa500': 'bg-custom_orange',
  '#76a6ea': 'bg-custom_blue',
  '#e876ea': 'bg-custom_pink',
};

export default function DashboardList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);
  const { dashboardsData, setDashboardsData } = useDashboardData();
  const { openModal } = useModal();
  const startIndex = (currentPage - 1) * 10; //시작페이지
  const totalPage = Math.ceil(totalCount / 10); //마지막페이지
  const { dashboardID } = useDashboardId();

  /** 대시보드 조회 파라미터 */
  const queryParams = {
    navigationMethod: 'pagination',
    cursorId: startIndex,
    page: currentPage,
    size: 10,
  };

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };
  /** 다음페이지 넘기기 함수 */
  const handleNextPage = () => {
    if (currentPage * 10 < totalCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  /** 이전페이지 넘기기 함수 */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /** 대시보드 조회 */
  useEffect(() => {
    const fetchdashboardData = async () => {
      const res = await instance.get('dashboards', {
        params: queryParams,
      });
      setDashboardsData(res.data.dashboards);
      setTotalCount(res.data.totalCount);
    };
    fetchdashboardData();
  }, [currentPage, dashboardID]);

  return (
    <div className='p-0 max-sm:hidden'>
      <div className='font-Pretendard mx-3 mb-8 mt-16 flex items-center justify-between px-3 font-bold text-gray-500'>
        <div className='font-pretendard text-xs font-bold text-custom_black-_333236 max-sm:hidden'>
          Dash Boards
        </div>
        <button>
          <img
            className='h-5 w-5'
            src='/images/addTaskButton.svg'
            alt='할 일 추가하기'
            onClick={() => handleOpenModal(<NewDashboardModal />)}
          />
        </button>
      </div>
      <div>
        {dashboardsData.map((todo) => (
          <div
            key={todo.id}
            className={clsx('px-3', {
              'bg-custom_gray-_eeeeee': Number(todo.id) === dashboardID, // todo.id와 현재 대시보드 id값이 같으면 배경색 추가
            })}
          >
            <Link
              key={todo.id}
              href={`/dashboard/${todo.id}`}
              className='font-Pretendard flex items-center gap-4 py-[14px] font-medium text-custom_black-_333236 max-sm:justify-center'
            >
              <div
                className={`h-2 w-2 rounded-full ${ColorPalette[todo.color]}`}
              />
              <div className='w-[80px] truncate max-sm:hidden'>
                {todo.title}
              </div>
              {todo.createdByMe && (
                <div className='relative h-3.5 w-5 max-sm:hidden'>
                  <Image
                    fill
                    src='/images/createByMe.svg'
                    alt='내가 만든 대시보드'
                  />
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className='px-3 max-sm:hidden'>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
}
