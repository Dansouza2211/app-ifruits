import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import Navigation from './src/navigation';
import { CartProvider } from './src/contexts/CartContext';
import { ModalProvider } from './src/contexts/ModalContext';
import { PaymentProvider } from './src/contexts/PaymentContext';

// Importação do CSS para o NativeWind
import './src/styles.css';

// Ignorar avisos específicos no modo de desenvolvimento
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  "[react-native-gesture-handler]",
  "expo-app-loading is deprecated",
  "Possible Unhandled Promise Rejection"
]);

// Adicionando logs para debug
console.log('App inicializado');

export default function App() {
  console.log('Renderizando App');
  return (
    <ModalProvider>
      <CartProvider>
        <PaymentProvider>
          <Navigation />
        </PaymentProvider>
      </CartProvider>
    </ModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
