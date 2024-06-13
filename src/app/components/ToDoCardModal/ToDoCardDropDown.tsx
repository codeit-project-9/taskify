'use Client';

import { useModal } from '@/context/ModalContext';
import DeleteCardModal from '../modals/DeleteCardModal';
import EditCardForm from '../modals/EditCardForm';
import { useEffect, useState } from 'react';

export default function ToDoCardDropDown({
  isOpen,
  cardId,
  setIsCardChange,
  dashboardId,
  columnId,
}: {
  isOpen: boolean;
  cardId: number;
  setIsCardChange: any;
  dashboardId: number;
  columnId: number;
}) {
  const [loginToken, setLoginToken] = useState<any>('');

  const { closeModal, openModal } = useModal();

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('loginToken');
    setLoginToken(token);
  }, []);

  return (
    isOpen && (
      <div className='absolute right-[40px] top-[40px] flex w-[93px] flex-col items-center justify-center gap-[6px] rounded-md border border-[#D9D9D9] bg-white p-[6px] text-[14px] shadow-lg'>
        <button
          className={buttonStyle}
          onClick={() =>
            handleOpenModal(
              <EditCardForm
                cardId={cardId}
                dashboardId={dashboardId}
                columnId={columnId}
                loginToken={loginToken}
                closeModal={closeModal}
                setIsCardChange={setIsCardChange}
              />,
            )
          }
        >
          <p>수정하기</p>
        </button>
        <button
          className={buttonStyle}
          onClick={() =>
            handleOpenModal(
              <DeleteCardModal
                cardId={cardId}
                setIsCardChange={setIsCardChange}
              />,
            )
          }
        >
          <span>삭제하기</span>
        </button>
      </div>
    )
  );
}

const buttonStyle =
  'px-[14px] py-[4px] rounded-sm hover:text-[#5534DA] hover:bg-[#F1EFFD]';
