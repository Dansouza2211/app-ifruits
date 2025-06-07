import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import Navigation from './src/navigation';
import { ProfileProvider } from './src/contexts/ProfileContext';
import { DeliveryProvider } from './src/contexts/DeliveryContext';
import { ModalProvider } from './src/contexts/ModalContext';

// Ignorar avisos específicos que não afetam a funcionalidade
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  "[react-native-gesture-handler]",
  "expo-app-loading is deprecated",
  "Possible Unhandled Promise Rejection",
  "Use process(css).then(cb) to work with async plugins",
  "Require cycle"
]);

const App: React.FC = () => {
  return (
    // ProfileProvider gerencia autenticação e dados do usuário
    <ProfileProvider>
      <StatusBar barStyle="light-content" backgroundColor="#41B54A" />
      {/* ModalProvider gerencia modais em toda a aplicação */}
      <ModalProvider>
        {/* DeliveryProvider gerencia estado de entregas */}
        <DeliveryProvider>
          <Navigation />
        </DeliveryProvider>
      </ModalProvider>
    </ProfileProvider>
  );
};

export default App; 