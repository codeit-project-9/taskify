'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@radix-ui/themes';
import { useRef } from 'react';
import { useModal } from '@/context/ModalContext';
import SettingChangedModal from './modals/SettingChangedModal';
import instance from '../api/axios';
import axios from 'axios';
import { LOGIN_TOKEN } from '../api/apiStrings';
import { useRouter } from 'next/navigation';

interface PasswordChangeValues {
  password: string;
  newPassword: string;
  newPassworConfirm: string;
}

export default function PasswordChangeForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordChangeValues>();

  const { openModal } = useModal();

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('newPassword');

  //비밀번호 변경폼 제출
  const onSubmit: SubmitHandler<PasswordChangeValues> = async (data) => {
    // 새 비밀번호 확인을 제외한 데이터 제출
    const submitData = {
      password: data.password,
      newPassword: data.newPassword,
    };
    try {
      const response = await instance.put('auth/password', submitData);
      if (response.status >= 200 && response.status < 300) {
        //변경성공시
        handleOpenModal(
          <SettingChangedModal>
            비밀번호가 변경되었습니다. 다시 로그인해주세요.
          </SettingChangedModal>,
        );
        localStorage.removeItem(LOGIN_TOKEN);
        router.push('/');
      }
    } catch (e: unknown) {
      //변경실패시
      if (axios.isAxiosError(e)) {
        const error = e.response?.data.message; // 에러발생시 메시지 저장
        handleOpenModal(<SettingChangedModal>{error}</SettingChangedModal>);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative mx-5 mt-[25px] h-[454px] w-[620px] flex-shrink-0 rounded-lg bg-custom_white px-[28px] py-4 max-xl:w-auto max-xl:max-w-[620px] max-sm:mx-3'
    >
      <div className='font-Pretendard pb-8 text-4xl font-bold text-custom_black-_333236'>
        비밀번호 변경
      </div>
      <div className='flex flex-col gap-5'>
        <div className='grid w-full items-center gap-[10px] text-lg'>
          <Label htmlFor='email'>현재 비밀번호</Label>
          <Input
            type='password'
            id='password'
            className='h-12'
            placeholder='현재 비밀번호 입력'
            {...register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요.' },
            })}
          />
        </div>
        <div className='font-Pretendard grid w-full items-center gap-[10px] text-lg font-medium'>
          <Label htmlFor='newPassword'>새 비밀번호</Label>
          <Input
            type='password'
            id='newPassword'
            className='h-12'
            placeholder='새 비밀번호 입력'
            {...register('newPassword', {
              required: {
                value: true,
                message: '새 비밀번호를 입력해주세요.',
              },
            })}
          />
          {
            <p className='font-pretendard text-sm font-normal text-custom_red'>
              {errors.newPassword?.message}
            </p>
          }
        </div>
        <div className='font-Pretendard grid w-full items-center gap-[10px] text-lg font-medium'>
          <Label htmlFor='newPassworConfirm'>새 비밀번호 확인</Label>
          <Input
            type='password'
            id='newPassworConfirm'
            className='h-12'
            placeholder='새 비밀번호 입력'
            {...register('newPassworConfirm', {
              required: {
                value: true,
                message: '새 비밀번호를 다시 입력해주세요.',
              },
              validate: (value) =>
                value === passwordRef.current || '비밀번호가 일치하지 않아요.',
            })}
          />
          {
            <p className='font-pretendard text-sm font-normal text-custom_red'>
              {errors.newPassworConfirm?.message}
            </p>
          }
        </div>
        <Button
          className='absolute bottom-7 right-7 rounded bg-custom_violet-_5534da px-[30px] py-2 text-white'
          type='submit'
        >
          변경
        </Button>
      </div>
    </form>
  );
}
