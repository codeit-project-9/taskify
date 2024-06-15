import { useModal } from '@/context/ModalContext';

/*
모달 하단에 있는 버튼 컴포넌트입니다. 
- actionName: 실제 Action을 하는 버튼 이름입니다. 기본값은 '생성'입니다.
- onAction: ActionButton의 onClick실행 함수입니다.
- value: ActionButton의 input disabled를 검사할때 필요한 value입니다.
*/

const ModalFooterButtons = ({
  actionName = '생성',
  onAction,
  onCancel,
  value,
  isDisabled = value,
}: {
  actionName?: string;
  onAction?: () => void;
  onCancel?: () => void;
  value?: string | boolean;
  isDisabled?: any;
}) => {
  const { closeModal } = useModal();

  return (
    <div className='flex justify-end gap-[12px] text-[16px] max-sm:justify-between max-sm:text-[14px]'>
      {/* 취소 버튼입니다. 모달이 닫칩니다 */}
      <button
        type='button'
        className={`${modalButtonStyle} bg-white text-[#787486]`}
        onClick={onCancel || closeModal}
      >
        취소
      </button>
      {/* Action Button ( 실제 Action을 하는 버튼입니다 ) */}
      <button
        type='submit'
        className={`${modalButtonStyle} bg-[#5534DA] text-white disabled:bg-opacity-20`}
        disabled={!isDisabled}
        onClick={onAction}
      >
        {actionName}
      </button>
    </div>
  );
};

const modalButtonStyle =
  'text-center w-[120px] h-[48px] text-[16px] rounded-lg border border-[#d9d9d9] max-sm:w-[138px] max-sm:flex-1 ';

export default ModalFooterButtons;
