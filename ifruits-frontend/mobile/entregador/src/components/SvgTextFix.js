import React from 'react';
import { Text } from 'react-native';
import { TextSvg } from 'react-native-svg';

// Este componente é uma alternativa para quando precisamos usar texto em SVGs
// Ajuda a evitar o erro "Text strings must be rendered within a <Text> component"
const SvgText = ({ children, ...props }) => {
  return (
    <TextSvg {...props}>
      <Text>{children}</Text>
    </TextSvg>
  );
};

export default SvgText; 