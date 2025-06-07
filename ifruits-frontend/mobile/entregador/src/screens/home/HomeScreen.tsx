import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Dados mock para entregas
const mockDeliveries = [
  {
    id: '1001',
    value: 15.75,
    distance: 3.2,
    estimatedTime: '15-20',
    items: 3,
    pickup: 'Rua dos Lírios, 789',
    delivery: 'Av. Secundária, 101'
  },
  {
    id: '1002',
    value: 12.50,
    distance: 2.5,
    estimatedTime: '20-25',
    items: 2,
    pickup: 'Av. Principal, 452',
    delivery: 'Rua das Flores, 78'
  }
];

const HomeScreen = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Próximos');

  // Toggle status de disponibilidade
  const toggleAvailability = (value) => {
    setIsAvailable(value);
  };

  // Filtrar entregas
  const filterOptions = ['Próximos', 'Maior Valor', 'Mais Rápidos'];

  const handleAcceptDelivery = (deliveryId) => {
    setDeliveries(deliveries.filter(delivery => delivery.id !== deliveryId));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com status */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Olá, Entregador</Text>
            <Text style={styles.headerSubtitle}>Bem-vindo ao iFruits</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={isAvailable ? styles.onlineText : styles.offlineText}>
              Online
            </Text>
            <Switch
              trackColor={{ false: "#D1D5DB", true: "#34D399" }}
              thumbColor="#ffffff"
              ios_backgroundColor="#D1D5DB"
              onValueChange={toggleAvailability}
              value={isAvailable}
            />
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Hoje</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>R$ 0.00</Text>
            <Text style={styles.statLabel}>Ganhos hoje</Text>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              selectedFilter === option ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setSelectedFilter(option)}
          >
            <Text style={selectedFilter === option ? styles.filterTextActive : styles.filterTextInactive}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Entregas Disponíveis</Text>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#41B54A" />
          </View>
        ) : deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <View style={styles.deliveryHeaderRow}>
                  <Text style={styles.deliveryPrice}>R$ {delivery.value.toFixed(2)}</Text>
                  <Text style={styles.deliveryDistance}>{delivery.distance} km</Text>
                </View>
                
                <View style={styles.addressRow}>
                  <View style={styles.iconContainer}>
                    <View style={styles.originIcon}>
                      <Icon name="circle-medium" size={24} color="white" />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.addressText}>{delivery.pickup}</Text>
                  </View>
                </View>
                
                <View style={styles.addressRow}>
                  <View style={styles.iconContainer}>
                    <View style={styles.destinationIcon}>
                      <Icon name="map-marker" size={16} color="white" />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.addressText}>{delivery.delivery}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.deliveryInfoRow}>
                <View style={styles.deliveryInfoItem}>
                  <Icon name="clock-outline" size={16} color="#757575" />
                  <Text style={styles.deliveryInfoLabel}>Tempo</Text>
                </View>
                <Text style={styles.deliveryInfoValue}>{delivery.estimatedTime} min</Text>
              </View>
              
              <View style={styles.deliveryInfoRow}>
                <View style={styles.deliveryInfoItem}>
                  <Icon name="package-variant" size={16} color="#757575" />
                  <Text style={styles.deliveryInfoLabel}>Itens</Text>
                </View>
                <Text style={styles.deliveryInfoValue}>{delivery.items}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={() => handleAcceptDelivery(delivery.id)}
              >
                <Text style={styles.acceptButtonText}>Aceitar Entrega</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="package-variant" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>
              Não há entregas disponíveis no momento
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              Fique online para receber novas entregas
            </Text>
          </View>
        )}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineText: {
    color: '#059669',
    marginRight: 8,
  },
  offlineText: {
    color: '#6B7280',
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 24,
  },
  filterButtonActive: {
    backgroundColor: '#41B54A',
  },
  filterButtonInactive: {
    backgroundColor: '#F3F4F6',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  filterTextInactive: {
    color: '#4B5563',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  deliveryHeader: {
    marginBottom: 16,
  },
  deliveryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryPrice: {
    color: '#059669',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deliveryDistance: {
    color: '#6B7280',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  iconContainer: {
    marginRight: 8,
    marginTop: 4,
  },
  originIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#41B54A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    color: '#1F2937',
  },
  deliveryInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deliveryInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfoLabel: {
    marginLeft: 4,
    color: '#6B7280',
  },
  deliveryInfoValue: {
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#41B54A',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 18,
  },
  emptyStateSubtitle: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HomeScreen; 