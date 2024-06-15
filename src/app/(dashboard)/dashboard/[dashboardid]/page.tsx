'use client';

import Column from '@/app/components/Column';
import NewColumnModal from '@/app/components/modals/NewColumnModal';
import ChipAddIcon from '@/app/components/ui/chipAddIcon';
import { useModal } from '@/context/ModalContext';
import { useEffect, useState } from 'react';
import { getColumnsByDashBoardId } from '@/app/components/ToDoCardModal/util';
import { useDashboardId } from '@/context/DashBoardIdContext';

export default function DashboardPage(dashboardid: any) {
  const [columnData, setColumnData] = useState([]);
  const [columnTitles, setColumnTitles] = useState([]);
  const [isColumnChange, setIsColumnChange] = useState(false);
  const { openModal } = useModal();
  const { dashboardID, setDashboardID } = useDashboardId();

  const id = Number(dashboardid.params.dashboardid);
  setDashboardID(id);

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  async function fetchColumns() {
    try {
      const columnData = await getColumnsByDashBoardId(id);
      setColumnData(columnData.data);
      const titles = columnData.data.map((column: any) => column.title);
      setColumnTitles(titles);
    } catch (error) {
      console.error(error);
    } finally {
      setIsColumnChange(false);
    }
  }

  useEffect(() => {
    fetchColumns();
  }, []);

  useEffect(() => {
    if (isColumnChange) {
      fetchColumns();
    }
  }, [isColumnChange]);

  return (
    <>
      <div className='flex'>
        <div className='flex h-full w-[calc(100vw-250px)] overflow-x-auto whitespace-nowrap bg-custom_gray-_fafafa max-xl:w-[calc(100vw-156px)] max-xl:flex-col max-xl:overflow-x-visible max-xl:whitespace-normal max-sm:w-[calc(100vw-64px)]'>
          {columnData &&
            columnData.length > 0 &&
            columnData.map((column: any) => {
              return (
                <Column
                  setIsColumnChange={setIsColumnChange}
                  key={column.id}
                  columnId={column.id}
                  title={column.title}
                  columnTitles={columnTitles}
                />
              );
            })}
          <div className='px-[20px] pt-[68px] max-xl:p-[10px]'>
            <button
              className='border-gray-_d9d9d9flex flex h-[70px] min-w-[354px] items-center justify-center rounded-lg border bg-white'
              onClick={() =>
                handleOpenModal(
                  <NewColumnModal
                    dashboardId={dashboardID}
                    columnTitles={columnTitles}
                    setIsColumnChange={setIsColumnChange}
                  />,
                )
              }
            >
              <p className='mr-[12px] text-[16px] font-bold'>
                새로운 컬럼 추가하기
              </p>
              <ChipAddIcon size={'large'} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
