import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const OrderDetailScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  
  // Status fictício para mostrar se o entregador está disponível
  const [disponivel, setDisponivel] = useState(true);

  // Coordenadas fictícias para o mapa
  const initialRegion = {
    latitude: -15.7801,
    longitude: -47.9292,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  
  const origem = {
    latitude: -15.7781,
    longitude: -47.9292,
  };
  
  const destino = {
    latitude: -15.7821,
    longitude: -47.9262,
  };
  
  // Rota fictícia
  const routeCoordinates = [
    { latitude: -15.7781, longitude: -47.9292 },
    { latitude: -15.7791, longitude: -47.9272 },
    { latitude: -15.7801, longitude: -47.9262 },
    { latitude: -15.7811, longitude: -47.9262 },
    { latitude: -15.7821, longitude: -47.9262 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
        >
          <Marker coordinate={origem}>
            <View style={styles.markerOrigin}>
              <Icon name="store" size={16} color="#fff" />
            </View>
          </Marker>
          
          <Marker coordinate={destino}>
            <View style={styles.markerDestination}>
              <Icon name="map-marker" size={16} color="#fff" />
            </View>
          </Marker>
          
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#41B54A"
            strokeWidth={4}
          />
        </MapView>
        
        <View style={styles.mapHeader}>
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.statusButton, disponivel ? styles.statusActive : styles.statusInactive]} 
              onPress={() => setDisponivel(!disponivel)}
            >
              <Text style={styles.statusText}>Disponível</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#41B54A" />
          <Text style={styles.searchText}>Estamos procurando rotas pra você</Text>
        </View>
      </View>
      
      <View style={styles.promotionContainer}>
        <Text style={styles.promotionTitle}>Promoção!</Text>
        <View style={styles.promotionCard}>
          <View style={styles.promotionDetails}>
            <Text style={styles.promotionHeading}>Ganhe R$ 40</Text>
            <Text style={styles.promotionDescription}>
              Fique disponível por
            </Text>
            <Text style={styles.promotionLocation}>
              <Icon name="map-marker" size={16} color="#000" /> Brasília
            </Text>
          </View>
          
          <View style={styles.promotionStats}>
            <Text style={styles.promotionHours}>3 horas</Text>
            <Text style={styles.promotionPercentage}>70% das rotas</Text>
            <Text style={styles.promotionEnd}>Termina às 18:00</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.earningsContainer}>
        <View style={styles.earningsBox}>
          <Text style={styles.earningsTitle}>Entregas do dia</Text>
          <Text style={styles.earningsValue}>R$ 11,00</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Text style={styles.statsTitle}>Rotas Aceitas</Text>
            <Text style={styles.statsValue}>2</Text>
          </View>
          
          <View style={styles.statsItem}>
            <Text style={styles.statsTitle}>Finalizadas</Text>
            <Text style={styles.statsValue}>2</Text>
          </View>
          
          <View style={styles.statsItem}>
            <Text style={styles.statsTitle}>Recusadas</Text>
            <Text style={styles.statsValue}>0</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapContainer: {
    height: '50%',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapHeader: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 8,
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statusActive: {
    backgroundColor: '#41B54A',
  },
  statusInactive: {
    backgroundColor: '#9CA3AF',
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchText: {
    marginLeft: 8,
    color: '#41B54A',
    fontWeight: '500',
  },
  markerOrigin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#41B54A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerDestination: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionContainer: {
    padding: 16,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promotionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  promotionDetails: {
    flex: 1,
  },
  promotionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  promotionLocation: {
    fontSize: 14,
    color: '#4B5563',
  },
  promotionStats: {
    alignItems: 'flex-end',
  },
  promotionHours: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  promotionPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  promotionEnd: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  earningsContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  earningsBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  earningsTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#41B54A',
  },
  statsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default OrderDetailScreen; 