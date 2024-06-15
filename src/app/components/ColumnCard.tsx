'use client';

import Image from 'next/image';
import CustomAvatar from './CustomAvatar';
import ToDoCardModal from './modals/ToDoCardModal';
import { useModal } from '@/context/ModalContext';
import { dateFormat } from './ToDoCardModal/util';
import { useDashboardId } from '@/context/DashBoardIdContext';

const tagPink = 'bg-[#f7dbf0] text-[#d549b6]';
const tagBrown = 'bg-[#f9eee3] text-[#d58d49]';
const tagBlue = 'bg-[#dbe6f7] text-[#4981d5]';
const tagGreen = 'bg-[#e7f7db] text-[#86d549]';
const colors = [tagBlue, tagGreen, tagPink, tagBrown];

interface ColumnCardProps {
  imageUrl: string;
  title: string;
  tags: string[];
  description: string;
  dueDate: string;
  assigner: any;
  cardId: number;
  columnId: number;
  columnTitle: string;
  setIsCardChange: any;
}

export default function ColumnCard({
  cardId,
  description,
  imageUrl,
  title,
  tags,
  dueDate,
  assigner,
  columnId,
  columnTitle,
  setIsCardChange,
}: ColumnCardProps) {
  const { openModal } = useModal();

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  const dueDataByFomat = dateFormat('format1', new Date(dueDate));

  return (
    <button
      className='flex flex-col items-center gap-[10px] rounded-md border border-custom_gray-_d9d9d9 bg-white p-[20px] max-xl:flex-row max-sm:flex-col'
      onClick={() =>
        handleOpenModal(
          <ToDoCardModal
            columnId={columnId}
            cardId={cardId}
            title={title}
            description={description}
            tags={tags}
            dueDate={dueDate}
            assigner={assigner}
            imageUrl={imageUrl}
            columnTitle={columnTitle}
            setIsCardChange={setIsCardChange}
          />,
        )
      }
    >
      {/* 카드 이미지 설정 */}
      {imageUrl && (
        <div className='relative h-[160px] w-[274px] max-xl:max-h-[51px] max-xl:max-w-[90px] max-sm:max-h-[999px] max-sm:w-full max-sm:max-w-[999px]'>
          <Image
            fill
            className='h-[160px] rounded-md object-cover max-xl:h-full'
            src={imageUrl}
            alt=''
          />
        </div>
      )}
      {/* 제목 */}
      <div className='flex w-full flex-col gap-[10px]'>
        <span className='h-[19px] overflow-hidden overflow-ellipsis text-left'>
          {title}
        </span>
        <div className='flex flex-col justify-center gap-[16px] max-xl:flex-row max-xl:items-center max-sm:flex-col max-sm:items-start'>
          <div className='flex flex-wrap overflow-x-hidden'>
            {tags.map((tag: any, index: number) => {
              const colorSelector = tag.length % 4;
              const selecetedColor = colors[colorSelector];
              return (
                <div
                  className={`${selecetedColor} mb-[6px] mr-[6px] flex h-[22px] items-center justify-center whitespace-nowrap rounded bg-[#F9EEE3] px-[6px] text-[12px]`}
                  key={index}
                >
                  {tag}
                </div>
              );
            })}
          </div>
          <div className='relative flex w-full items-center justify-between text-[12px] text-custom_gray-_787486'>
            <div className='flex gap-[6px]'>
              <img src='/images/calender-icon.svg' alt='캘린더 아이콘' />
              {dueDataByFomat}
            </div>
            <CustomAvatar
              nickName={assigner.nickname}
              profileUrl={assigner.profileImageUrl}
            />
          </div>
        </div>
      </div>
      {/* 태그 */}
    </button>
  );
}
