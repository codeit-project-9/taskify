'use client';

import CommentsList from '../ToDoCardModal/CommentsList';
import CardHeader from '../ToDoCardModal/CardHeader';
import CardInfo from '../ToDoCardModal/CardInfo';
import CommentInput from '../ToDoCardModal/CommentInput';
import CardContents from '../ToDoCardModal/CardContents';
import { useState } from 'react';

interface assigner {
  profileImageUrl?: string;
  nickname: string;
  id: number;
}

export default function ToDoCardModal({
  columnId,
  title,
  description,
  tags,
  dueDate,
  assigner,
  imageUrl,
  cardId,
  columnTitle,
  setIsCardChange,
}: {
  columnId: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  imageUrl?: string;
  assigner: assigner;
  cardId: number;
  columnTitle: string;
  setIsCardChange: any;
}) {
  const [isCommentChange, setIsCommentChange] = useState(false);

  return (
    <div className='flex max-h-[calc(100vh-100px)] flex-col gap-[24px] overflow-y-auto whitespace-nowrap p-[4px] max-xl:w-[632px] max-sm:w-full max-sm:gap-[16px]'>
      <CardHeader
        cardId={cardId}
        title={title}
        setIsCardChange={setIsCardChange}
        columnId={columnId}
      />
      {/* 컨텐츠 */}
      <div className='flex gap-[24px] max-sm:flex-col'>
        <div className='flex w-[450px] flex-col gap-[16px] max-xl:w-[420px] max-sm:order-2 max-sm:w-full'>
          <CardContents
            imageUrl={imageUrl}
            description={description}
            tags={tags}
            columntitle={columnTitle}
          />
          <CommentInput
            columnId={columnId}
            cardId={cardId}
            setIsCommentChange={setIsCommentChange}
          />
          <CommentsList
            cardId={cardId}
            isCommentChange={isCommentChange}
            setIsCommentChange={setIsCommentChange}
          />
        </div>
        <CardInfo assignee={assigner} dueDate={dueDate} />
      </div>
    </div>
  );
}
