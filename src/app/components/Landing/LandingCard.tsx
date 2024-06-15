import { ReactNode } from 'react';

export default function LandingCard({
  children,
  name,
  info,
}: {
  children: ReactNode;
  name: string;
  info: string;
}) {
  return (
    <div className='w-[378px] overflow-hidden rounded-lg max-sm:w-[343px]'>
      <div className='flex h-[260px] w-[100%] items-center justify-center bg-custom_black-_4b4b4b max-sm:h-[236px]'>
        {children}
      </div>
      <div className='h-[124px] w-[100%] bg-custom_black-_171717 px-8 py-[33px] max-sm:h-[113px] max-sm:py-[27px]'>
        <h4 className='mb-[18px] text-[18px] font-bold leading-[21px]'>
          {name}
        </h4>
        <span className='text-base font-[16px] leading-[19px]'>{info}</span>
      </div>
    </div>
  );
}
