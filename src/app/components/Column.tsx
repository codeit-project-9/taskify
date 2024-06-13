'use client';

import ColumnCard from '@/app/components/ColumnCard';
import Image from 'next/image';
import ChipAddIcon from './ui/chipAddIcon';
import { useModal } from '@/context/ModalContext';
import UpdateColumnModal from './modals/UpdateColumnModal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCardsByColumnId } from './ToDoCardModal/api';
import CreateCardForm from './modals/CreateCardForm';

export default function Column({
  title,
  columnId,
  dashboardId,
  setIsColumnChange,
}: {
  title: string;
  columnId: number;
  dashboardId: number;
  setIsColumnChange: any;
}) {
  const [cards, setCards] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [size, setSize] = useState(4);
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [isChange, setIsCardChange] = useState(false);
  const [loginToken, setLoginToken] = useState<any>('');

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  const fetchCards = async (size: number) => {
    setLoading(true);
    try {
      const res = await getCardsByColumnId(columnId, size);
      const newCards = res.cards;
      setCards(newCards);
      setTotalCount(res.totalCount);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setSize((prev) => {
          const newSize = prev + 1;
          fetchCards(newSize);
          return newSize;
        });
      }
    },
    [size, loading],
  );

  //옵저버 객체 만들기
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    const target = document.getElementById(`intersection-target${columnId}`);

    if (target && totalCount > size) {
      observer.observe(target);
    }
    if (cards.length === 0) {
      observer.disconnect();
    }
    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, totalCount, size]);

  useEffect(() => {
    fetchCards(size);
  }, [size, columnId, isChange]);

  // 빈 배열로 변경하여 초기 렌더링 시 한 번만 실행되도록 변경
  useEffect(() => {
    const token = window.localStorage.getItem('loginToken'); // 수정된 부분
    setLoginToken(token);
  }, []); // 빈 배열로 변경하여 초기 렌더링 시 한 번만 실행되도록 변경

  useEffect(() => {
    if (isChange) {
      fetchCards(size);
      setIsCardChange(false);
    }
  }, [isChange, size]);

  return (
    <div className='border-gray-_eeeeee flex h-[calc(100vh-80px)] min-w-[354px] flex-col gap-[25px] overflow-y-auto whitespace-nowrap border-r p-[20px] max-xl:h-[346px] max-xl:w-full'>
      {/* 카드 info */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center text-[16px] font-bold'>
          <img
            className='mr-[8px]'
            src='/images/Ellipse-puple.svg'
            alt='꾸미는 점'
          />
          <span className='mr-[12px]'>{title}</span>
          <div className='flex h-[20px] w-[20px] items-center justify-center rounded bg-custom_gray-_eeeeee text-center text-[12px] font-normal text-custom_gray-_787486'>
            <p>{totalCount}</p>
          </div>
        </div>
        <Image
          className='cursor-pointer'
          width={24}
          height={24}
          src='/images/settings-icon.svg'
          alt='설정 아이콘'
          onClick={() =>
            handleOpenModal(
              <UpdateColumnModal
                title={title}
                columnId={columnId}
                setIsColumnChange={setIsColumnChange}
              />,
            )
          }
        />
      </div>
      <div className='flex flex-col gap-[16px]'>
        {/* 카드 추가 버튼 */}
        <div
          className='border-gray-_d9d9d9 flex h-[40px] items-center justify-center rounded-md border bg-white'
          onClick={() =>
            handleOpenModal(
              <CreateCardForm
                dashboardId={dashboardId}
                columnId={columnId}
                loginToken={loginToken}
                closeModal={closeModal}
                setIsCardChange={setIsCardChange}
              />,
            )
          }
        >
          <ChipAddIcon size={'large'} />
        </div>
        {/* 카드 배열 뿌리기 */}
        {cards &&
          cards.map((card: any, index: number) => {
            return (
              <ColumnCard
                columnId={columnId}
                dashboardId={dashboardId}
                key={index}
                imageUrl={card.imageUrl}
                title={card.title}
                tags={card.tags}
                description={card.description}
                dueDate={card.dueDate}
                assigner={card.assignee}
                cardId={card.id}
                columnTitle={title}
                setIsCardChange={setIsCardChange}
              />
            );
          })}
        <div id={`intersection-target${columnId}`}></div>
      </div>
    </div>
  );
}
