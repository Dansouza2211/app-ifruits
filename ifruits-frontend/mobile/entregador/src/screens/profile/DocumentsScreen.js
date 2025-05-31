import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const DocumentsScreen = () => {
  const navigation = useNavigation();
  
  const documents = [
    {
      id: '1',
      title: 'Carteira Nacional de Habilitação (CNH)',
      type: 'Documento pessoal',
      status: 'Aprovado',
      expiryDate: '31/12/2027',
      lastUpdate: '10/01/2023',
      imageUrl: 'https://via.placeholder.com/800x600/E6F7E8/41B54A?text=CNH'
    },
    {
      id: '2',
      title: 'Certificado de Registro de Veículo (CRV)',
      type: 'Documento do veículo',
      status: 'Aprovado',
      expiryDate: '31/12/2023',
      lastUpdate: '15/01/2023',
      imageUrl: 'https://via.placeholder.com/800x600/E6F7E8/41B54A?text=CRV'
    },
    {
      id: '3',
      title: 'Comprovante de Residência',
      type: 'Documento pessoal',
      status: 'Aprovado',
      expiryDate: 'Não expira',
      lastUpdate: '10/01/2023',
      imageUrl: 'https://via.placeholder.com/800x600/E6F7E8/41B54A?text=Comprovante+Residencia'
    },
    {
      id: '4',
      title: 'Comprovante de Conta Bancária',
      type: 'Documento financeiro',
      status: 'Aprovado',
      expiryDate: 'Não expira',
      lastUpdate: '10/01/2023',
      imageUrl: 'https://via.placeholder.com/800x600/E6F7E8/41B54A?text=Comprovante+Bancario'
    },
    {
      id: '5',
      title: 'Foto de Perfil',
      type: 'Imagem pessoal',
      status: 'Aprovado',
      expiryDate: 'Não expira',
      lastUpdate: '12/01/2023',
      imageUrl: 'https://i.pravatar.cc/150?img=8'
    }
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleUploadNewDocument = () => {
    // Lógica para fazer upload de um novo documento
    console.log('Upload new document');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovado':
        return {
          bgColor: '#D1FAE5',
          textColor: '#065F46'
        };
      case 'Pendente':
        return {
          bgColor: '#FEF3C7',
          textColor: '#92400E'
        };
      case 'Recusado':
        return {
          bgColor: '#FEE2E2',
          textColor: '#B91C1C'
        };
      default:
        return {
          bgColor: '#E5E7EB',
          textColor: '#374151'
        };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documentos</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Seus documentos</Text>
          <Text style={styles.introText}>
            Aqui você pode visualizar, atualizar e gerenciar seus documentos
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleUploadNewDocument}
        >
          <Icon name="upload" size={20} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Enviar novo documento</Text>
        </TouchableOpacity>

        <View style={styles.documentsContainer}>
          {documents.map((document) => {
            const statusStyle = getStatusColor(document.status);
            
            return (
              <View key={document.id} style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentTypeContainer}>
                    <Icon 
                      name={
                        document.type === 'Documento pessoal' ? 'card-account-details-outline' :
                        document.type === 'Documento do veículo' ? 'car-outline' :
                        document.type === 'Documento financeiro' ? 'bank-outline' :
                        'image-outline'
                      } 
                      size={18} 
                      color="#6B7280" 
                    />
                    <Text style={styles.documentType}>{document.type}</Text>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bgColor }]}>
                    <Text style={[styles.statusText, { color: statusStyle.textColor }]}>
                      {document.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.documentTitle}>{document.title}</Text>

                <View style={styles.documentPreviewContainer}>
                  <Image 
                    source={{ uri: document.imageUrl }}
                    style={styles.documentPreview}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.documentInfoContainer}>
                  <View style={styles.documentInfoItem}>
                    <Text style={styles.documentInfoLabel}>Validade</Text>
                    <Text style={styles.documentInfoValue}>{document.expiryDate}</Text>
                  </View>

                  <View style={styles.documentInfoItem}>
                    <Text style={styles.documentInfoLabel}>Última atualização</Text>
                    <Text style={styles.documentInfoValue}>{document.lastUpdate}</Text>
                  </View>
                </View>

                <View style={styles.documentActions}>
                  <TouchableOpacity style={styles.documentActionButton}>
                    <Icon name="eye-outline" size={20} color="#41B54A" />
                    <Text style={styles.documentActionText}>Visualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.documentActionButton}>
                    <Icon name="refresh" size={20} color="#41B54A" />
                    <Text style={styles.documentActionText}>Atualizar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
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
  introContainer: {
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
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#41B54A',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  documentsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentType: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  documentPreviewContainer: {
    marginBottom: 12,
  },
  documentPreview: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  documentInfoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
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
  documentActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  documentActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  documentActionText: {
    fontSize: 14,
    color: '#41B54A',
    fontWeight: '500',
    marginLeft: 4,
  },
  spacer: {
    height: 40,
  },
});

export default DocumentsScreen; 