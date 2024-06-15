'use client';

import Link from 'next/link';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import NewDashboardModal from './modals/NewDashboardModal';
import instance from '@/app/api/axios';

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

export default function DashboardCard() {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [totalCount, setTotalCount] = useState<number>(10); //총 페이지
  const [dashboardsData, setDashboardsData] = useState<DashboardData[]>([]);
  const { openModal } = useModal();
  const startIndex = (currentPage - 1) * 5; //시작페이지
  const totalPage = Math.ceil(totalCount / 5); //마지막페이지

  /** 대시보드 조회 파라미터 */
  const queryParams = {
    navigationMethod: 'pagination',
    cursorId: startIndex,
    page: currentPage,
    size: 5,
  };

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  const handleNextPage = () => {
    if (currentPage * 5 < totalCount) {
      setCurrentPage(currentPage + 1);
    }
  };

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
  }, [currentPage]);

  return (
    <section className='mx-auto ml-6 mt-6 grid max-w-[1000px] gap-3'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
        <button
          className='font-Pretendard flex h-16 items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-7 text-base font-semibold text-gray-800'
          onClick={() => handleOpenModal(<NewDashboardModal />)}
        >
          새로운 대시보드
          <div className='relative h-5 w-5'>
            <Image
              fill
              src='/images/addTaskButton2.svg'
              alt='대시보드 바로가기'
            />
          </div>
        </button>
        {dashboardsData.map((todo) => (
          <Link
            key={todo.id}
            href={`/dashboard/${todo.id}`}
            className='font-Pretendard flex h-16 items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-7 text-base font-semibold text-gray-800'
          >
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-4'>
                <div
                  className={`h-2 w-2 rounded-full ${ColorPalette[todo.color]}`}
                />
                <div>{todo.title}</div>
              </div>
              {todo.createdByMe && (
                <div className='relative h-3.5 w-5'>
                  <Image
                    fill
                    src='/images/createByMe.svg'
                    alt='내가 만든 대시보드'
                  />
                </div>
              )}
            </div>
            <button className='relative h-5 w-5'>
              <Image
                fill
                src='/images/rightArrowButton.svg'
                alt='대시보드 바로가기'
              />
            </button>
          </Link>
        ))}
      </div>
      <div className='flex items-center justify-end gap-3 pr-0 pt-2'>
        <div className='font-Pretendard text-base font-normal text-gray-800'>
          {currentPage} 페이지 중 {totalPage}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
    </section>
  );
}
