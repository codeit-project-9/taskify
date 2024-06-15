'use Client';

import { useEffect, useState } from 'react';
import CustomAvatar from '../CustomAvatar';

interface assignee {
  profileImageUrl?: string;
  nickname: string;
  id: number;
}

const CardInfo = ({
  assignee,
  dueDate,
}: {
  assignee: assignee;
  dueDate: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 640);
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  console.log(isMobile);
  return (
    <div className='flex max-h-[155px] w-[200px] flex-col gap-[20px] rounded-lg border p-[16px] text-[14px] max-xl:w-[180px] max-sm:w-full max-sm:flex-row max-sm:text-[12px]'>
      {/* 담당자 */}
      <div className='flex w-[168px] flex-col gap-[6px] max-sm:w-auto max-sm:flex-1 max-sm:gap-[4px]'>
        <p className='text-[12px] font-semibold max-sm:text-[10px]'>담당자</p>
        <div className='flex items-center gap-[8px]'>
          <CustomAvatar
            profileUrl={assignee.profileImageUrl}
            nickName={assignee.nickname}
            size={isMobile ? 'small' : 'medium'}
          />
          <span>{assignee.nickname}</span>
        </div>
      </div>
      {/* 마감일 */}
      <div className='flex flex-col gap-[6px] max-sm:flex-1'>
        <p className='text-[12px] font-semibold max-sm:text-[10px]'>마감일</p>
        <p>{dueDate}</p>
      </div>
    </div>
  );
};

export default CardInfo;
