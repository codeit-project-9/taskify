'use client';

import React from 'react';
import { useModal, useModalState } from '@/context/ModalContext';

const CommonModal: React.FC = () => {
  const { modalContent, isModalOpen } = useModalState();
  const { closeModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={closeModal}
    >
      <div
        className='relative mx-[24px] rounded-lg bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </div>
  );
};

export default CommonModal;
