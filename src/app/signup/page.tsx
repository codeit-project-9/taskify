import AuthLogo from '../components/AuthLogo';
import Link from 'next/link';
import SignupForm from '../components/SignupForm';

export default function Login() {
  return (
    <div className='flex min-h-[100vh] flex-col items-center bg-custom_gray-_fafafa pt-[60px] text-custom_black-_333236'>
      <AuthLogo>첫 방문을 환영합니다!</AuthLogo>
      <SignupForm />
      <span className='mt-6 pb-16 leading-[19px]'>
        이미 가입하셨나요?{' '}
        <Link href='/login' className='text-custom_violet-_5534da underline'>
          로그인 하기
        </Link>
      </span>
    </div>
  );
}
