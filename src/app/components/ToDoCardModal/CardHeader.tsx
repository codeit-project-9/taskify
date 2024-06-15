import { useModal } from '@/context/ModalContext';
import ToDoCardDropDown from './ToDoCardDropDown';
import { useState } from 'react';
import { useDashboardId } from '@/context/DashBoardIdContext';

const CardHeader = ({
  title,
  cardId,
  setIsCardChange,
  columnId,
}: {
  title: string;
  cardId: number;
  setIsCardChange: void;
  columnId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { closeModal } = useModal();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='max-sm:justify-initial right-1 flex justify-between max-sm:flex-col'>
      <h2 className='max-w-[450px] whitespace-pre-wrap break-words text-[24px] font-bold max-xl:max-w-[420px] max-sm:mt-[12px] max-sm:text-[20px]'>
        {title}
      </h2>
      <div className='relative flex gap-[24px] max-sm:absolute max-sm:right-0 max-sm:top-0 max-sm:h-auto max-sm:gap-[16px] max-sm:p-[12px]'>
        <button onClick={handleToggle}>
          <img
            src='/images/card-setting.svg'
            alt='카드 설정 아이콘'
            className='max-sm:h-[20px] max-sm:w-[20px]'
          />
        </button>
        <ToDoCardDropDown
          isOpen={isOpen}
          cardId={cardId}
          columnId={columnId}
          setIsCardChange={setIsCardChange}
          setisOpen={setIsOpen}
        />
        <button onClick={closeModal}>
          <img
            src='/images/close-button.svg'
            alt='닫기 버튼'
            className='max-sm:h-[24px] max-sm:w-[24px]'
          />
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
