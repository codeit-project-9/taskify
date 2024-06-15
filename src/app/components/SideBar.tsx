import Image from 'next/image';
import DashboardList from './DashboardList';
import Link from 'next/link';
import DashboardListMobile from './DashboardListMobile';

export default function SideBar() {
  return (
    <aside className='relative w-[67px] border-r-2 border-solid border-gray-300 bg-white sm:w-[160px] xl:w-[300px]'>
      <Link href='/' className='flex p-5 px-6 pb-0 max-sm:px-5'>
        <div className='relative h-[33px] w-[28px] max-sm:w-6'>
          <Image fill src='/images/sideBarLogo.svg' alt='Taskify 로고' />
        </div>
        <div className='h-[22]px relative w-[80px] max-sm:hidden'>
          <Image fill src='/images/Taskify.svg' alt='' />
        </div>
      </Link>
      <DashboardList />
      <DashboardListMobile />
    </aside>
  );
}
