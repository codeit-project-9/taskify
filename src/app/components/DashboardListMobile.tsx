'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useDashboardData } from '@/context/DashboardDataContext';
import { useDashboardId } from '@/context/DashBoardIdContext';
import NewDashboardModal from './modals/NewDashboardModal';
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

type DashboardData = {
  id: string;
  title: string;
  color: string;
  createdByMe: boolean;
};

export default function DashboardListMobile() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);
  const { dashboardsData, setDashboardsData } = useDashboardData();
  const startPointRef = useRef(0);
  const nameRef = useRef<HTMLDivElement | null>(null);
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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startPointRef.current = e.touches[0].pageX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endPoint = e.changedTouches[0].pageX;
    if (startPointRef.current < endPoint) {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
    } else if (startPointRef.current > endPoint) {
      if (currentPage === totalPage) return;
      setCurrentPage(currentPage + 1);
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
  }, [currentPage]);

  return (
    <div className='p-0 sm:hidden'>
      <div className='mx-2 mb-8 mt-16 flex items-center justify-between px-3'>
        <button>
          <img
            className='h-5 w-5'
            src='/images/addTaskButton.svg'
            alt='할 일 추가하기'
            onClick={() => handleOpenModal(<NewDashboardModal />)}
          />
        </button>
      </div>
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {dashboardsData.map((todo) => (
          <div
            key={todo.id}
            ref={nameRef}
            className={clsx('px-3', {
              'bg-custom_gray-_eeeeee': Number(todo.id) === dashboardID, // todo.id와 현재 대시보드 id값이 같으면 배경색 추가
            })}
          >
            <Link
              key={todo.id}
              href={`/dashboard/${todo.id}`}
              className='flex items-center justify-center py-[14px]'
            >
              <div
                className={`h-2 w-2 rounded-full ${ColorPalette[todo.color]}`}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
