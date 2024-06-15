'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CustomAvatarProps {
  profileUrl?: string; // 유저 프로필 이미지
  nickName: string; // 유저 닉네임
  size?: 'small' | 'medium' | 'large';
}

const colors = ['#FFC85A', '#FDD446', '#9DD7ED', '#C4B1A2', '#A3C4A2'];

const getSizeClasses = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 'min-h-[24px] h-[24px] w-[24px] text-[12px]';
    case 'medium':
      return 'min-h-[34px] h-[34px] w-[34px] text-[16px]';
    case 'large':
      return 'min-h-[38px] h-[38px] w-[38px] text-[16px]';
  }
};

/*
  유저 프로필 이미지가 없다면 프로필이 랜덤으로 지정된 배경색과 닉네임의 첫 글자로 지정됩니다.
  small: 24px/24px (기본)
  medium: 34px/34px
  large: 38px/38px
*/

export default function CustomAvatar({
  profileUrl,
  nickName,
  size = 'small',
}: CustomAvatarProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const getRandomBackgroundColor = () => {
    const firstLetter = nickName.charCodeAt(0);
    const index = firstLetter % colors.length;
    return colors[index];
  };

  useEffect(() => {
    setBackgroundColor(getRandomBackgroundColor());
  }, []);

  const sizeClasses = getSizeClasses(size);

  return (
    <div
      className={`relative overflow-hidden rounded-full border-2 border-white ${sizeClasses}`}
    >
      {profileUrl ? (
        <div className='h-full w-full bg-white'>
          <Image
            fill
            src={profileUrl}
            alt='Profile Image'
            className='rounded-full object-cover'
          />
        </div>
      ) : (
        <div
          className='flex h-full w-full items-center justify-center text-white'
          style={{ backgroundColor }}
        >
          <span>{nickName[0].toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}
