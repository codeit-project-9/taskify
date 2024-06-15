import Image from 'next/image';
import Link from 'next/link';

export default function LandingFooter() {
  return (
    <footer className='mt-[160px] flex h-[100px] items-center justify-center text-custom_gray-_9fa6b2 max-sm:mt-[120px] max-sm:h-[216px] max-sm:items-start max-sm:text-xs'>
      <div className='flex w-[100%] max-w-[1720px] items-center justify-between px-10 max-sm:flex-col'>
        <div className='max-sm:mb-3'>@codeit-2023</div>
        <div className='flex gap-8 max-sm:mb-[68px] max-sm:gap-5'>
          <Link href='https://www.naver.com/'>Privacy Policy</Link>
          <Link href='https://www.naver.com/'>FAQ</Link>
        </div>
        <div className='flex items-center gap-3.5 max-sm:gap-5'>
          <Link
            href='https://www.naver.com/'
            className='relative h-5 w-5 max-sm:h-4 max-sm:w-4'
          >
            <Image src='/LandingPage/footerEmail.svg' alt='이메일' fill />
          </Link>
          <Link
            href='https://www.facebook.com/'
            className='relative h-[22px] w-[22px] max-sm:h-[18px] max-sm:w-[18px]'
          >
            <Image src='/LandingPage/footerFacebook.svg' alt='페이스북' fill />
          </Link>
          <Link
            href='https://www.instagram.com/'
            className='relative h-[22px] w-[22px] max-sm:h-[18px] max-sm:w-[18px]'
          >
            <Image
              src='/LandingPage/footerInstagram.svg'
              alt='인스타그램'
              fill
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
