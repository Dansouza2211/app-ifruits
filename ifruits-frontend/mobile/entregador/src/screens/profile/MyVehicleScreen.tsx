import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MyVehicleScreen = () => {
  const navigation = useNavigation();
  const [vehicleData, setVehicleData] = useState({
    type: 'Motocicleta',
    brand: 'Honda',
    model: 'CG 160',
    year: '2022',
    color: 'Preta',
    licensePlate: 'ABC-1234',
    category: 'Particular',
    documents: {
      cnh: {
        number: '01234567890',
        expiryDate: '31/12/2027',
        status: 'Aprovado'
      },
      crlv: {
        number: '98765432100',
        expiryDate: '31/12/2023',
        status: 'Aprovado'
      }
    }
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Veículo</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.vehicleImageContainer}>
          <Icon name="motorbike" size={80} color="#41B54A" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Dados do Veículo</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tipo</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.type}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Marca</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.brand}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Modelo</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.model}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Ano</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.year}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Cor</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.color}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Placa</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.licensePlate}
              editable={false}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.category}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Documentação</Text>
          
          <View style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <Icon name="card-account-details-outline" size={24} color="#41B54A" />
              <Text style={styles.documentTitle}>CNH</Text>
              <View style={[styles.statusBadge, styles.approvedBadge]}>
                <Text style={styles.statusText}>{vehicleData.documents.cnh.status}</Text>
              </View>
            </View>
            
            <View style={styles.documentInfo}>
              <View style={styles.documentInfoItem}>
                <Text style={styles.documentInfoLabel}>Número</Text>
                <Text style={styles.documentInfoValue}>{vehicleData.documents.cnh.number}</Text>
              </View>
              
              <View style={styles.documentInfoItem}>
                <Text style={styles.documentInfoLabel}>Validade</Text>
                <Text style={styles.documentInfoValue}>{vehicleData.documents.cnh.expiryDate}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <Icon name="file-document-outline" size={24} color="#41B54A" />
              <Text style={styles.documentTitle}>CRLV</Text>
              <View style={[styles.statusBadge, styles.approvedBadge]}>
                <Text style={styles.statusText}>{vehicleData.documents.crlv.status}</Text>
              </View>
            </View>
            
            <View style={styles.documentInfo}>
              <View style={styles.documentInfoItem}>
                <Text style={styles.documentInfoLabel}>Número</Text>
                <Text style={styles.documentInfoValue}>{vehicleData.documents.crlv.number}</Text>
              </View>
              
              <View style={styles.documentInfoItem}>
                <Text style={styles.documentInfoLabel}>Validade</Text>
                <Text style={styles.documentInfoValue}>{vehicleData.documents.crlv.expiryDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Solicitar alteração de veículo</Text>
        </TouchableOpacity>

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
  vehicleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: '#E6F7E8',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1F2937',
  },
  documentCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  approvedBadge: {
    backgroundColor: '#D1FAE5',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#065F46',
  },
  documentInfo: {
    flexDirection: 'row',
  },
  documentInfoItem: {
    flex: 1,
  },
  documentInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  documentInfoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#41B54A',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
});

export default MyVehicleScreen; 