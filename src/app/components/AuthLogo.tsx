import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLogo({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col items-center'>
      <Link
        href='/'
        className='flex w-[200px] flex-col items-end gap-y-[30px] max-sm:w-[120px] max-sm:gap-y-[18px]'
      >
        <div className='relative h-[190px] w-[165px] max-sm:h-[114px] max-sm:w-[99px]'>
          <Image src='/images/logoImg.svg' alt='Taskify' fill priority />
        </div>
        <div className='relative h-[55px] w-[198px] max-sm:h-[33px] max-sm:w-[119px]'>
          <Image src='/images/logoText.svg' alt='' fill />
        </div>
      </Link>
      <span className='mt-[14px] text-center text-[20px] font-medium leading-6 max-xl:mt-3 max-sm:mt-[11px]'>
        {children}
      </span>
    </div>
  );
}
