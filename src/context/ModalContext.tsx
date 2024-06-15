'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalStateContextProps {
  modalContent: ReactNode | null;
  isModalOpen: boolean;
}

interface ModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalStateContext = createContext<ModalStateContextProps | undefined>(
  undefined,
);
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <ModalStateContext.Provider value={{ modalContent, isModalOpen }}>
      <ModalContext.Provider value={{ openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModalState = (): ModalStateContextProps => {
  const context = useContext(ModalStateContext);
  if (!context) {
    throw new Error('useModalState 사용 불가');
  }
  return context;
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal 사용 불가');
  }
  return context;
};
