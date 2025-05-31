import React, { createContext, useContext, useState } from 'react';

// Criando o contexto
const ModalContext = createContext();

// Hook personalizado para usar o contexto
export const useModal = () => useContext(ModalContext);

// Provedor do contexto
export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    visible: false,
    type: null,
    data: null
  });

  // Abrir modal
  const openModal = (type, data = null) => {
    setModal({
      visible: true,
      type,
      data
    });
  };

  // Fechar modal
  const closeModal = () => {
    setModal({
      visible: false,
      type: null,
      data: null
    });
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext; 