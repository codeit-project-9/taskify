import AuthLogo from '../components/AuthLogo';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';

export default function Login() {
  return (
    <div className='flex min-h-[100vh] flex-col items-center bg-custom_gray-_fafafa pt-[60px] text-custom_black-_333236'>
      <AuthLogo>오늘도 만나서 반가워요!</AuthLogo>
      <LoginForm />
      <span className='mt-6 pb-16 leading-[19px]'>
        회원이 아니신가요?{' '}
        <Link href='/signup' className='text-custom_violet-_5534da underline'>
          회원가입 하기
        </Link>
      </span>
    </div>
  );
}
