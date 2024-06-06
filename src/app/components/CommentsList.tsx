import { ChangeEvent, useEffect, useState } from 'react';
import { CreateCommentRes } from '../api/apiTypes/commentsType';
import CustomAvatar from './CustomAvatar';
import Comment from './Comment';

export default function CommentsList({
  comments,
}: {
  comments: CreateCommentRes[];
}) {
  const [selectedId, setSelectedId] = useState('');
  // 아래 state는 api적용 이후 수정 예정입니다.
  const [nowComments, setNowComments] = useState(comments);

  return (
    <div className='flex flex-col'>
      {nowComments.map((comment: any, index: number) => {
        return (
          <div key={index} className='flex gap-[12px]'>
            <div className='flex flex-col items-center'>
              <CustomAvatar
                profileUrl={comment.author.profileImageUrl}
                nickName={comment.author.nickname}
                size={'large'}
              />
              {/* 댓글이 1개면 구분선을 붙이지 않습니다 */}
              {nowComments.length === 1 ? (
                ''
              ) : (
                <img
                  src='/images/Vector.svg'
                  className='h-[50px] w-[4px]'
                  alt='구분선'
                />
              )}
            </div>
            <Comment
              index={index}
              id={comment.id}
              setSelectedId={setSelectedId}
              createdAt={comment.createdAt}
              content={comment.content}
              isEditing={selectedId === comment.id ? true : false}
            />
          </div>
        );
      })}
    </div>
  );
}
