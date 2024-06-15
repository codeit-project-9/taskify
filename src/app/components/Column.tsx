'use client';

import ColumnCard from '@/app/components/ColumnCard';
import Image from 'next/image';
import ChipAddIcon from './ui/chipAddIcon';
import { useModal } from '@/context/ModalContext';
import UpdateColumnModal from './modals/UpdateColumnModal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCardsByColumnId } from './ToDoCardModal/util';
import CreateCardForm from './modals/CreateCardForm';

export default function Column({
  title,
  columnId,
  setIsColumnChange,
  columnTitles,
}: {
  title: string;
  columnId: number;
  setIsColumnChange: any;
  columnTitles: string[];
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
      threshold: 0.5,
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
    <div className='border-gray-_eeeeee flex min-w-[354px] flex-col gap-[25px] border-r p-[20px] max-xl:h-[346px] max-xl:w-full max-xl:border-b'>
      {/* 컬럼 Info (title, totalCount) */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center text-[16px] font-bold'>
          <img
            className='mr-[8px]'
            src='/images/Ellipse-puple.svg'
            alt='꾸미는 점'
          />
          <p className='mr-[12px] max-w-[150px] overflow-hidden overflow-ellipsis whitespace-nowrap'>
            {title}
          </p>
          <div className='flex h-[20px] w-[20px] items-center justify-center rounded bg-custom_gray-_eeeeee text-center text-[12px] font-normal text-custom_gray-_787486'>
            <p>{totalCount}</p>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenModal(
              <UpdateColumnModal
                title={title}
                columnId={columnId}
                setIsColumnChange={setIsColumnChange}
                columnTitles={columnTitles}
              />,
            )
          }
        >
          <Image
            className='cursor-pointer'
            width={24}
            height={24}
            src='/images/settings-icon.svg'
            alt='설정 아이콘'
          />
        </button>
      </div>
      <div className='flex flex-col gap-[16px]'>
        {/* 카드 추가 버튼 */}
        <button
          className='border-gray-_d9d9d9 flex h-[40px] items-center justify-center rounded-md border bg-white'
          onClick={() =>
            handleOpenModal(
              <CreateCardForm
                columnId={columnId}
                loginToken={loginToken}
                closeModal={closeModal}
                setIsCardChange={setIsCardChange}
              />,
            )
          }
        >
          <ChipAddIcon size={'large'} />
        </button>
        {/* 카드 배열 뿌리기 */}
        <div className='flex h-[calc(100vh-250px)] flex-col gap-[16px] overflow-y-auto whitespace-nowrap max-xl:max-h-[202px]'>
          {cards &&
            cards.map((card: any, index: number) => {
              return (
                <ColumnCard
                  columnId={columnId}
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
    </div>
  );
}
