import Image from 'next/image';
import Link from 'next/link';

interface BackButtonProps {
  link: string;
}

export default function BackButton({ link }: BackButtonProps) {
  return (
    <Link
      href={link}
      className='font-Pretendard flex items-center gap-2 pl-5 pt-5 text-base font-medium text-custom_black-_333236'
    >
      <div className='relative h-5 w-5'>
        <Image fill src='/images/leftArrowButton.svg' alt='대시보드 바로가기' />
      </div>
      돌아가기
    </Link>
  );
}
