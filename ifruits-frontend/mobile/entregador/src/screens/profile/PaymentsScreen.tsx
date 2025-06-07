import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const PaymentsScreen = () => {
  const navigation = useNavigation();
  const [paymentData, setPaymentData] = useState({
    balance: 420.5,
    bankAccount: {
      type: 'Conta Corrente',
      bank: 'Nubank',
      agency: '0001',
      account: '12345678-9',
      name: 'João Silva',
      cpf: '123.456.789-00'
    },
    pixKeys: [
      {
        type: 'CPF',
        key: '123.456.789-00',
        isDefault: true
      },
      {
        type: 'E-mail',
        key: 'joao.silva@example.com',
        isDefault: false
      }
    ],
    instantTransfer: true
  });
  
  const [instantTransferEnabled, setInstantTransferEnabled] = useState(paymentData.instantTransfer);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleInstantTransfer = () => {
    setInstantTransferEnabled(!instantTransferEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamentos</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Saldo disponível</Text>
            <Icon name="eye-outline" size={24} color="#1F2937" />
          </View>
          <Text style={styles.balanceValue}>R$ {paymentData.balance.toFixed(2)}</Text>
          <TouchableOpacity style={styles.transferButton}>
            <Text style={styles.transferButtonText}>Transferir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Dados Bancários</Text>
          
          <View style={styles.bankInfoContainer}>
            <View style={styles.bankIconContainer}>
              <Icon name="bank-outline" size={24} color="#41B54A" />
            </View>
            <View style={styles.bankInfoDetails}>
              <Text style={styles.bankName}>{paymentData.bankAccount.bank}</Text>
              <Text style={styles.bankAccountInfo}>
                {paymentData.bankAccount.type} • Ag. {paymentData.bankAccount.agency} • C/C {paymentData.bankAccount.account}
              </Text>
              <Text style={styles.bankAccountHolder}>
                {paymentData.bankAccount.name} • CPF {paymentData.bankAccount.cpf}
              </Text>
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Chaves PIX</Text>
          
          {paymentData.pixKeys.map((key, index) => (
            <View key={index} style={styles.pixKeyContainer}>
              <View style={styles.pixIconContainer}>
                <Icon name="key-outline" size={24} color="#41B54A" />
              </View>
              <View style={styles.pixKeyDetails}>
                <View style={styles.pixKeyHeader}>
                  <Text style={styles.pixKeyType}>{key.type}</Text>
                  {key.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Padrão</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.pixKeyValue}>{key.key}</Text>
              </View>
              <TouchableOpacity style={styles.editIcon}>
                <Icon name="pencil-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addPixKeyButton}>
            <Icon name="plus" size={20} color="#41B54A" />
            <Text style={styles.addPixKeyText}>Adicionar chave PIX</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceTitle}>Transferência automática</Text>
              <Text style={styles.preferenceDescription}>
                Transferir automaticamente para sua conta ao receber pagamentos
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={instantTransferEnabled ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={toggleInstantTransfer}
              value={instantTransferEnabled}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Histórico de Transações</Text>
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>Ver todas as transações</Text>
            <Icon name="chevron-right" size={20} color="#41B54A" />
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#41B54A',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholderIcon: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  transferButton: {
    backgroundColor: '#41B54A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  bankInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  bankIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F7E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankInfoDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  bankAccountInfo: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  bankAccountHolder: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  editIcon: {
    padding: 4,
  },
  pixKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  pixIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F7E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pixKeyDetails: {
    flex: 1,
  },
  pixKeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  pixKeyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#065F46',
    fontWeight: '500',
  },
  pixKeyValue: {
    fontSize: 14,
    color: '#4B5563',
  },
  addPixKeyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  addPixKeyText: {
    fontSize: 14,
    color: '#41B54A',
    fontWeight: '500',
    marginLeft: 8,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  preferenceTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#41B54A',
    fontWeight: '500',
    marginRight: 4,
  },
  spacer: {
    height: 40,
  },
});

export default PaymentsScreen; 