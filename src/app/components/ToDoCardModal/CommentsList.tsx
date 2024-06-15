'use client';

import { useCallback, useEffect, useState } from 'react';
import CustomAvatar from '../CustomAvatar';
import Comment from './Comment';
import { getCommentsByCardId } from './util';

export default function CommentsList({
  cardId,
  isCommentChange,
  setIsCommentChange,
}: {
  cardId: number;
  isCommentChange: boolean;
  setIsCommentChange: any;
}) {
  const [comments, setComments] = useState<string[]>([]);
  const [size, setSize] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchComments = async (size: number) => {
    setLoading(true);
    try {
      const resBysize = await getCommentsByCardId(cardId, size);
      console.log(resBysize);
      setComments(resBysize.comments);
      const res = await getCommentsByCardId(cardId);
      setTotalCount(res.comments.length);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsCommentChange(false);
      setLoading(false);
    }
  };

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setSize((prev) => {
          const newSize = prev + 1;
          fetchComments(newSize);
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

    const target = document.getElementById(`intersection-target${cardId}`);

    if (target && totalCount > size) {
      observer.observe(target);
    }
    if (comments.length === 0) {
      observer.disconnect();
    }
    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, totalCount, size, cardId]);

  useEffect(() => {
    fetchComments(size);
  }, []);

  useEffect(() => {
    if (isCommentChange) {
      fetchComments(size);
    }
  }, [isCommentChange, size]);

  const isMobile = window.innerWidth < 768;
  return (
    comments.length > 0 && (
      <div className='flex max-h-[230px] flex-col overflow-y-auto whitespace-nowrap'>
        {comments.map((comment: any, index: number) => {
          return (
            <div key={comment.id} className='flex gap-[12px]'>
              <div className='flex h-full flex-col items-center'>
                <CustomAvatar
                  profileUrl={comment.author.profileImageUrl}
                  nickName={comment.author.nickname}
                  size={isMobile ? 'small' : 'medium'}
                />
                <div className='my-[5px] h-full w-[1px] bg-gray-300'></div>
              </div>
              <Comment
                commentId={comment.id}
                createdAt={comment.createdAt}
                content={comment.content}
                commenterName={comment.author.nickname}
                setIsCommentChange={setIsCommentChange}
              />
            </div>
          );
        })}
        {loading && <span>로딩중</span>}
        <div id={`intersection-target${cardId}`} className='min-h-[10px]'></div>
      </div>
    )
  );
}
