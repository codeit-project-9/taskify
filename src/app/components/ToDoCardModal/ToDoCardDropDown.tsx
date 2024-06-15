'use Client';

import { useModal } from '@/context/ModalContext';
import DeleteCardModal from '../modals/DeleteCardModal';
import EditCardForm from '../modals/EditCardForm';
import { useEffect, useRef, useState } from 'react';

export default function ToDoCardDropDown({
  isOpen,
  setisOpen,
  cardId,
  setIsCardChange,
  columnId,
}: {
  isOpen: boolean;
  cardId: number;
  setIsCardChange: any;
  columnId: number;
  setisOpen: any;
}) {
  const [loginToken, setLoginToken] = useState<any>('');
  const dropDownRef = useRef<HTMLDivElement>(null);

  const { closeModal, openModal } = useModal();

  const handleOpenModal = (content: React.ReactNode) => {
    openModal(content);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('loginToken');
    setLoginToken(token);
  }, []);

  //외부 클릭시 dropdown 끄기
  useEffect(() => {
    const onCheckClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setisOpen(false);
      }
    };
    document.addEventListener('mousedown', onCheckClickOutside);
    return () => {
      document.removeEventListener('mousedown', onCheckClickOutside);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div
        className='absolute right-[60px] top-[40px] z-[9999] flex w-[93px] flex-col items-center justify-center gap-[6px] rounded-md border border-[#D9D9D9] bg-white p-[6px] text-[14px] shadow-lg'
        ref={dropDownRef}
      >
        <button
          className={buttonStyle}
          onClick={() =>
            handleOpenModal(
              <EditCardForm
                cardId={cardId}
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
