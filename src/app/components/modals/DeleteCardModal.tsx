'use Client';

import { useModal } from '@/context/ModalContext';
import { deleteCard } from '../ToDoCardModal/util';
import ModalFooterButtons from '../ModalFooterButtons';

const DeleteCardModal = ({
  cardId,
  setIsCardChange,
}: {
  cardId: number;
  setIsCardChange: any;
}) => {
  const { closeModal } = useModal();

  const handleDeleteCard = () => {
    deleteCard(cardId);
    setIsCardChange(true);
    closeModal();
  };

  const handleCancelButton = () => {
    closeModal();
  };

  return (
    <div className='relative flex h-[202px] w-[492px] items-center justify-center p-[4px]'>
      <p className='text-[18px]'>카드가 삭제됩니다</p>
      <div className='absolute bottom-0 right-0'>
        <ModalFooterButtons
          onAction={handleDeleteCard}
          onCancel={handleCancelButton}
          actionName='삭제'
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export default DeleteCardModal;
