'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '@/app/api/axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import SettingChangedModal from './modals/SettingChangedModal';
import SignupDoneModal from './modals/SignupDoneModal';

type Inputs = {
  Id: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  acceptTerms: boolean;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({ mode: 'onBlur' });
  const [ispassShow, setIsPassShow] = useState<boolean>(false);
  const [ispassCheckShow, setIsPassCheckShow] = useState<boolean>(false);
  const { openModal } = useModal();

  const INPUT_STYLE =
    'px-4 py-[15px] outline-none rounded-lg border border-solid border-custom_gray-_d9d9d9 focus:border-custom_violet-_5534da no-autofill';
  const ERROR_STYLE = 'text-[14px] leading-[17px] text-custom_red';

  const trySignup: SubmitHandler<Inputs> = async () => {
    let res;
    try {
      res = await axios.post('/users', {
        email: getValues('Id'),
        nickname: getValues('nickname'),
        password: getValues('password'),
      });
      openModal(<SignupDoneModal>가입이 완료되었습니다!</SignupDoneModal>);
    } catch (err: any) {
      openModal(
        <SettingChangedModal>
          {err.response?.data.message || '에러! 에러!'}
        </SettingChangedModal>,
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(trySignup)}
      className='mt-[38px] flex w-[100%] max-w-[544px] flex-col px-3 text-[16px] text-custom_black-_333236 max-xl:mt-[60px] max-sm:mt-10'
    >
      {/*아이디 부분 */}
      <label htmlFor='Id' className='mb-2'>
        아이디
      </label>
      <div className='mb-4 flex flex-col gap-y-2'>
        <input
          id='Id'
          placeholder='이메일을 입력해주세요'
          type='text'
          className={`${INPUT_STYLE} ${errors.Id ? 'border-custom_red' : ''}`}
          aria-invalid={errors.Id ? 'true' : 'false'}
          {...register('Id', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
              message: '이메일 형식으로 작성해 주세요.',
            },
          })}
        />
        {errors.Id && (
          <strong className={ERROR_STYLE}>{errors?.Id?.message}</strong>
        )}
      </div>
      {/*닉네임 부분*/}
      <label htmlFor='nickname' className='mb-2'>
        닉네임
      </label>
      <div className='mb-4 flex flex-col gap-y-2'>
        <input
          id='nickname'
          placeholder='이메일을 입력해주세요'
          type='text'
          className={`${INPUT_STYLE} ${
            errors.nickname ? 'border-custom_red' : ''
          }`}
          aria-invalid={errors.nickname ? 'true' : 'false'}
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[?a-zA-Z0-9ㄱ-ㅎ가-힣#?!@$ %^&*-/].{0,9}$/,
              message: '열 자 이하로 작성해주세요',
            },
          })}
        />
        {errors.nickname && (
          <strong className={ERROR_STYLE}>{errors?.nickname?.message}</strong>
        )}
      </div>
      {/*비밀번호 부분 */}
      <label htmlFor='password' className='mb-2'>
        비밀번호
      </label>
      <div className='relative mb-5 flex flex-col gap-y-2'>
        <input
          id='password'
          placeholder='8자 이상 입력해주세요'
          type={ispassShow ? 'string' : 'password'}
          className={`${INPUT_STYLE} ${
            errors.password ? 'border-custom_red' : ''
          }`}
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: {
              value: /^[?a-zA-Z0-9#?!@$ %^&*-/].{7,}$/,
              message: '8자 이상 작성해 주세요',
            },
          })}
        />
        <button
          className='absolute right-4 top-4'
          type='button'
          onClick={() => setIsPassShow(!ispassShow)}
        >
          {ispassShow ? (
            <Image
              src='/AuthPage/eyeOn.svg'
              width={24}
              height={24}
              alt='비밀번호 보여짐'
            />
          ) : (
            <Image
              src='/AuthPage/eyeOff.svg'
              width={24}
              height={24}
              alt='비밀번호 숨겨짐'
            />
          )}
        </button>
        {errors.password && (
          <strong className={ERROR_STYLE}>{errors?.password?.message}</strong>
        )}
      </div>
      {/*비밀번호 확인 부분 */}
      <label htmlFor='passwordCheck' className='mb-2'>
        비밀번호 확인
      </label>
      <div className='relative mb-5 flex flex-col gap-y-2'>
        <input
          id='passwordCheck'
          placeholder='비밀번호를 한 번 더 입력해주세요'
          type={ispassCheckShow ? 'string' : 'password'}
          className={`${INPUT_STYLE} ${
            errors.passwordCheck ? 'border-custom_red' : ''
          }`}
          aria-invalid={errors.passwordCheck ? 'true' : 'false'}
          {...register('passwordCheck', {
            validate: (value) =>
              value === getValues('password')
                ? true
                : '비밀번호가 일치하지 않습니다.',
          })}
        />
        <button
          className='absolute right-4 top-4'
          type='button'
          onClick={() => setIsPassCheckShow(!ispassCheckShow)}
        >
          {ispassCheckShow ? (
            <Image
              src='/AuthPage/eyeOn.svg'
              width={24}
              height={24}
              alt='비밀번호 확인 보여짐'
            />
          ) : (
            <Image
              src='/AuthPage/eyeOff.svg'
              width={24}
              height={24}
              alt='비밀번호 확인 숨겨짐'
            />
          )}
        </button>
        {errors.passwordCheck && (
          <strong className={ERROR_STYLE}>
            {errors?.passwordCheck?.message}
          </strong>
        )}
      </div>
      <div className='mb-[21px] mt-1 flex items-center gap-x-2'>
        <input
          id='acceptTerms'
          type='checkbox'
          className='h-5 w-5'
          {...register('acceptTerms', { required: true })}
        />
        <label htmlFor='acceptTerms'> 이용약관에 동의합니다.</label>
      </div>
      <input
        value={'가입하기'}
        type='submit'
        className='flex h-[50px] w-[100%] cursor-pointer items-center justify-center rounded-lg bg-custom_violet-_5534da text-[18px] font-medium text-custom_white disabled:cursor-default disabled:bg-custom_gray-_9fa6b2'
        disabled={!isDirty || !isValid}
      />
    </form>
  );
}
