import { useModal } from '@/context/ModalContext';

const SettingChangedModal = ({ children }: { children: string }) => {
  const { closeModal } = useModal();
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <div className='flex h-[250px] w-[540px] flex-col items-center gap-[45px] max-sm:w-[327px]'>
      <p className='mb-4 mt-[108px] text-lg max-sm:mx-6 max-sm:mx-auto max-sm:w-full max-sm:text-center'>
        {children}
      </p>
      <button
        className='ml-auto rounded bg-custom_violet-_5534da px-[46px] py-3.5 text-base text-white max-sm:mx-auto'
        onClick={handleCloseModal}
      >
        확인
      </button>
    </div>
  );
};

export default SettingChangedModal;
