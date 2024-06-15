import Image from 'next/image';
import Link from 'next/link';
import Card from './LandingCard';

export default function LandingMain() {
  const DASH_INFO = '대시보드 사진과 이름을 변경할 수 있어요.';
  const INVITE_INFO = '새로운 팀원을 초대할 수 있어요.';
  const MEMBER_INFO = '구성원을 초대하고 내보낼 수 있어요.';
  return (
    <main className='flex flex-col items-center px-10'>
      <div className='flex flex-col items-center pt-[94px]'>
        <div className='relative h-[422px] w-[722px] max-xl:h-[315px] max-xl:w-[537px] max-sm:h-[168px] max-sm:w-[287px]'>
          <Image
            src='/LandingPage/topImage.png'
            alt='소개 페이지'
            fill
            priority
            sizes='75vw'
          />
        </div>
        <h2 className='flex items-center gap-x-7 pt-12 max-xl:gap-x-6 max-md:flex-col max-sm:gap-y-[5px]'>
          <span className='text-[76px] font-bold leading-[100px] tracking-[-2px] max-xl:text-[56px] max-sm:text-[40px] max-sm:leading-normal'>
            새로운 일정 관리
          </span>
          <strong className='text-[90px] leading-[65px] tracking-[-1px] text-custom_violet-_5534da max-xl:text-[70px] max-sm:text-[42px]'>
            Taskify
          </strong>
        </h2>
        <span className='pt-6 text-lg'>서비스의 메인 설명 들어갑니다.</span>
        <Link
          href='/login'
          className='mt-[66px] inline-flex h-[50px] w-[280px] items-center justify-center rounded-lg bg-custom_violet-_5534da pb-3.5 pt-[15px]'
        >
          <div className='text-center text-lg font-medium'>로그인하기</div>
        </Link>
      </div>
      <div className='relative mt-[184px] h-[600px] w-[1200px] rounded-lg bg-custom_black-_171717 max-xl:h-[972px] max-xl:w-[100%] max-sm:mt-[80px] max-sm:h-[686px]'>
        <h3 className='ml-[60px] mt-[123px] flex flex-col gap-y-[100px] max-xl:mt-[63px] max-sm:ml-0 max-sm:mt-[60px] max-sm:items-center max-sm:gap-y-[61px] max-sm:text-center'>
          <span className='text-[22px] font-medium text-custom_gray-_9fa6b2 max-sm:text-lg'>
            Point 1
          </span>
          <span className='lading-[64px] w-[360px] text-[48px] font-bold max-sm:w-[270px] max-sm:text-[36px] max-sm:leading-[50px]'>
            일의 우선순위를 관리하세요
          </span>
        </h3>
        <div className='absolute bottom-0 right-0 h-[497px] w-[594px] max-xl:h-[435px] max-xl:w-[519px] max-sm:h-[248px] max-sm:w-[296px]'>
          <Image
            src='/LandingPage/orderToDo.png'
            alt='우선순위'
            fill
            sizes='75vw'
            priority
          />
        </div>
      </div>
      <div className='mt-[90px] flex h-[600px] w-[1200px] flex-row-reverse justify-end rounded-lg bg-custom_black-_171717 max-xl:h-[972px] max-xl:w-[100%] max-xl:flex-col max-xl:justify-between max-sm:mt-[59px] max-sm:h-[686px]'>
        <h3 className='ml-[100px] mt-[123px] flex flex-col gap-y-[100px] max-xl:ml-[60px] max-xl:mt-[63px] max-sm:ml-0 max-sm:mt-[60px] max-sm:items-center max-sm:gap-y-[61px] max-sm:text-center'>
          <span className='text-[22px] font-medium text-custom_gray-_9fa6b2 max-sm:text-lg'>
            Point 2
          </span>
          <span className='lading-[64px] w-[320px] text-[48px] font-bold max-sm:w-[240px] max-sm:text-[36px] max-sm:leading-[50px]'>
            해야 할 일을 등록하세요
          </span>
        </h3>
        <div className='relative ml-[108px] mt-[98px] h-[502px] w-[436px] self-end overflow-hidden rounded-t-lg border-0 max-xl:ml-0 max-xl:h-[415px] max-xl:w-[360px] max-xl:self-center max-sm:h-[205px] max-sm:w-[217px]'>
          <Image
            src='/LandingPage/createToDo.png'
            alt='할 일 등록'
            fill
            sizes='50vw'
          />
        </div>
      </div>
      <div className='mt-[90px] w-[100%] max-w-[1200px]'>
        <h3 className='text-[28px] font-bold leading-[33px] max-xl:text-center max-sm:text-[22px] max-sm:leading-[26px]'>
          생산성을 높이는 다양한 설정 ⚡
        </h3>
        <div className='mt-9 flex items-center gap-x-[33px] max-xl:flex-col max-xl:gap-y-12 max-sm:mt-[42px] max-sm:gap-y-10'>
          <Card name='대시보드 설정' info={DASH_INFO}>
            <div className='relative h-[124px] w-[300px] max-sm:h-[107px] max-sm:w-[260px]'>
              <Image
                src='/LandingPage/dashboard.png'
                alt=''
                fill
                sizes='33vw'
              />
            </div>
          </Card>
          <Card name='초대' info={INVITE_INFO}>
            <div className='relative h-[231px] w-[300px] max-sm:h-[200px] max-sm:w-[260px]'>
              <Image src='/LandingPage/invite.png' alt='' fill sizes='33vw' />
            </div>
          </Card>
          <Card name='구성원' info={MEMBER_INFO}>
            <div className='relative h-[195px] w-[300px] max-sm:h-[179px] max-sm:w-[260px]'>
              <Image src='/LandingPage/members.png' alt='' fill sizes='33vw' />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
