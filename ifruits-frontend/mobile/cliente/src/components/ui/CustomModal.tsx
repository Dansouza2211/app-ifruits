import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const CustomModal = ({
  visible,
  title,
  message,
  buttons = [],
  onClose,
  type = 'default', // 'default', 'success', 'warning', 'error'
  showLogo = true
}) => {
  // Definir cores com base no tipo
  let iconName = 'information-outline';
  let bgColor = '#41B54A'; // Verde padrão

  switch (type) {
    case 'success':
      iconName = 'check-circle-outline';
      bgColor = '#41B54A'; // Verde
      break;
    case 'warning':
      iconName = 'alert-outline';
      bgColor = '#FF9800'; // Laranja
      break;
    case 'error':
      iconName = 'close-circle-outline';
      bgColor = '#F44336'; // Vermelho
      break;
    default:
      iconName = 'information-outline';
      bgColor = '#41B54A'; // Verde
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Cabeçalho com a logo */}
              <View style={[styles.header, { backgroundColor: bgColor }]}>
                {showLogo && (
                  <Image
                    source={require('../../assets/logo_branca.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                )}
              </View>

              {/* Ícone */}
              <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                <Icon name={iconName} size={30} color="#FFFFFF" />
              </View>

              {/* Conteúdo */}
              <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>

              {/* Botões */}
              <View style={styles.buttonContainer}>
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      index === buttons.length - 1 ? { backgroundColor: bgColor } : styles.secondaryButton,
                      buttons.length === 1 ? { flex: 1 } : { flex: 1 },
                      index < buttons.length - 1 ? { marginRight: 10 } : {}
                    ]}
                    onPress={button.onPress}
                  >
                    <Text 
                      style={[
                        styles.buttonText,
                        index === buttons.length - 1 ? styles.primaryButtonText : styles.secondaryButtonText
                      ]}
                    >
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  logo: {
    width: 120,
    height: 40
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: width * 0.85 / 2 - 30,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 3
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333333'
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 22
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE'
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5'
  },
  secondaryButtonText: {
    color: '#555555',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default CustomModal; 