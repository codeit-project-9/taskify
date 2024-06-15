import Image from 'next/image';
import Link from 'next/link';

export default function LandingHeader() {
  return (
    <nav className='sticky top-0 z-10 flex flex-row items-center justify-between bg-custom_black-_000000 pb-[17px] pl-[26px] pr-20 pt-5 max-lg:pr-10'>
      <Link href='/'>
        <h1 className='flex items-center'>
          <div className='relative h-[27px] w-[24px] sm:h-[33px] sm:w-[29px]'>
            <Image src='/LandingPage/logoWhite.svg' alt='taskify' fill />
          </div>
          <div className='hidden pt-0.5 sm:block'>
            <Image
              src='/LandingPage/taskifyWhite.svg'
              width={80}
              height={22}
              alt=''
            />
          </div>
        </h1>
      </Link>
      <div className='flex gap-9 text-base max-sm:gap-[20px] max-sm:text-sm'>
        <Link href='/login' className=''>
          로그인
        </Link>
        <Link href='/signup'>회원가입</Link>
      </div>
    </nav>
  );
}
