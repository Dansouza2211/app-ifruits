import React, { createContext, useContext, useState } from 'react';
import CustomModal from '../components/ui/CustomModal';

// Criando o contexto
const ModalContext = createContext();

// Hook personalizado para usar o contexto
export const useModal = () => useContext(ModalContext);

// Provider do contexto
export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    type: 'default',
    showLogo: true,
  });

  // Função para mostrar o modal
  const showModal = (config) => {
    setModalConfig({
      ...config,
      visible: true,
    });
  };

  // Função para fechar o modal
  const hideModal = () => {
    setModalConfig((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  // Atalhos para tipos específicos de modais
  const showSuccess = (title, message, buttons = [], showLogo = true) => {
    showModal({
      title,
      message,
      buttons,
      type: 'success',
      showLogo,
    });
  };

  const showWarning = (title, message, buttons = [], showLogo = true) => {
    showModal({
      title,
      message,
      buttons,
      type: 'warning',
      showLogo,
    });
  };

  const showError = (title, message, buttons = [], showLogo = true) => {
    showModal({
      title,
      message,
      buttons,
      type: 'error',
      showLogo,
    });
  };

  // Função para substituir Alert.alert
  const alert = (title, message, buttons = [], type = 'default', showLogo = true) => {
    const formattedButtons = buttons.map((btn) => ({
      text: btn.text,
      onPress: () => {
        hideModal();
        if (btn.onPress) {
          btn.onPress();
        }
      },
      style: btn.style,
    }));

    showModal({
      title,
      message,
      buttons: formattedButtons,
      type,
      showLogo,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        showSuccess,
        showWarning,
        showError,
        alert,
      }}
    >
      {children}
      <CustomModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
        onClose={hideModal}
        type={modalConfig.type}
        showLogo={modalConfig.showLogo}
      />
    </ModalContext.Provider>
  );
}; 