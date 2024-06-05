'use client';

import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/app/components/ui/dialog';
import ToDoCardDropDown from '../ToDoCardDropDown';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import CommentsList from '../CommentsList';
import CustomAvatar from '../CustomAvatar';
import { useModal } from '@/context/ModalContext';

interface assignee {
  profileImageUrl?: string;
  nickname: string;
  id: number;
}

export default function ToDoCardModal({
  title,
  description,
  tags,
  dueDate,
  assignee,
  imageUrl,
}: {
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: assignee;
  imageUrl?: string;
}) {
  const [value, setValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { closeModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newvalue = e.target.value;
    setValue(newvalue);
  };

  const handleToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-[682px] flex flex-col gap-[24px] p-[4px]'>
      {/* 헤더 부분 */}
      <div className='flex justify-between relative right-1'>
        <h2 className='text-[24px] font-bold'>{title}</h2>
        <div className='flex gap=[24px] relative '>
          <img
            src='/images/card-setting.svg'
            alt='카드 설정 아이콘'
            onClick={handleToggle}
          />
          <ToDoCardDropDown isOpen={isOpen} />
          <img
            src='/images/close-button.svg'
            alt='닫기 버튼'
            onClick={closeModal}
          ></img>
        </div>
      </div>
      {/* 컨텐츠 */}
      <div className='flex w-[450px] gap-[24px]'>
        <div className='flex flex-col gap-[16px]'>
          {/* 태그 */}
          <div className='flex gap-[20px] items-center'>
            <div className='flex w-[65px] bg-[#F1EFFD] gap-[6px] rounded-xl px-[8px] py-[4px]'>
              <img
                className='w-[6px]'
                src='/images/Ellipse-puple.svg'
                alt='꾸미는 점'
              />
              <span className='text-[12px] text-[#5534DA]'>To Do</span>
            </div>
            <img src='/images/Vector.svg' className='h-[20px]' alt='구분선' />
            <div className='flex'>
              {tags.map((tag: any, index: number) => {
                return (
                  <div
                    className='bg-[#F9EEE3] rounded text-[#D58D49] text-[12px] px-[6px] py-[4px] mr-[6px]'
                    key={index}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 카드 컨텐츠 */}
          <div className='mb-[8px]'>
            <div className='text-[14px] mb-[16px]'>{description}</div>
            {imageUrl && (
              <div className='w-[450px] h-[260px] relative'>
                <Image
                  fill
                  src={imageUrl}
                  alt='카드 이미지'
                  className='object-cover rounded-md'
                />
              </div>
            )}
          </div>

          {/* 댓글 */}
          <form className='relative'>
            <label className='text-[16px] font-medium'>댓글</label>
            <textarea
              onChange={handleChange}
              placeholder='댓글 작성하기'
              className='w-full resize-none h-[110px] border border-[#d9d9d9] rounded-md p-[16px] text-[14px] mt-[10px]'
            ></textarea>
            <button
              type='submit'
              className={`${modalButtonStyle} disabled:text-[#787486]`}
              disabled={!value}
            >
              입력
            </button>
          </form>
          <CommentsList comments={commentsList.comments} />
        </div>

        {/* 카드 부연설명 (담장자, 마감일) */}
        <div className='w-[200px] h-[155px] p-[16px] text-[14px] flex flex-col gap-[20px] rounded-lg border'>
          <div className='w-[168px]'>
            <p className='mb-[6px] font-semibold text-[12px]'>담당자</p>
            <div className='flex gap-[8px] items-center'>
              <CustomAvatar
                profileUrl={assignee.profileImageUrl}
                nickName={assignee.nickname}
                size='large'
              />
              <span>{assignee.nickname}</span>
            </div>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <p className='font-semibold text-[12px]'>마감일</p>
            <p>{dueDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const modalButtonStyle =
  'text-center w-[83px] h-[32px] text-[12px] rounded-md bg-white text-[#5534DA] border border-[#D9D9D9] absolute right-[10px] bottom-[15px]';

const commentsList = {
  cursorId: 0,
  comments: [
    {
      id: 0,
      content: '이젠 this time is real',
      createdAt: '2024-06-03T16:13:33.230Z',
      updatedAt: '2024-06-03T16:13:33.230Z',
      cardId: 0,
      author: {
        profileImageUrl: '/images/test/profile-test.jpeg',
        nickname: '보아',
        id: 0,
      },
    },
    {
      id: 1,
      content: ' no one can deny',
      createdAt: '2024-06-03T16:13:33.230Z',
      updatedAt: '2024-06-03T16:13:33.230Z',
      cardId: 0,
      author: {
        profileImageUrl: '',
        nickname: '공중정원',
        id: 0,
      },
    },
    {
      id: 2,
      content: '세상 가운데 살아 숨 쉬는 곳',
      createdAt: '2024-06-03T16:13:33.230Z',
      updatedAt: '2024-06-03T16:13:33.230Z',
      cardId: 0,
      author: {
        profileImageUrl: '',
        nickname: '짱좋다',
        id: 0,
      },
    },
  ],
};
