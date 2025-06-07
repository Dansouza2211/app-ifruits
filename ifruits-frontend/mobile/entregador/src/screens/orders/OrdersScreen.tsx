import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mockOrders = [
  {
    id: '9877',
    status: 'in_progress',
    date: 'Hoje',
    time: '15:45',
    amount: 28.90,
    address: 'Av. L2 Norte, 603 - Brasília',
    items: 2,
    store: 'iFruits Asa Norte'
  },
  {
    id: '9876',
    status: 'completed',
    date: '15 Ago, 2023',
    time: '14:30',
    amount: 32.50,
    address: 'Av. Paulista, 1500 - São Paulo',
    items: 3
  },
  {
    id: '9875',
    status: 'completed',
    date: '14 Ago, 2023',
    time: '19:45',
    amount: 25.75,
    address: 'R. Augusta, 1200 - São Paulo',
    items: 2
  },
  {
    id: '9874',
    status: 'canceled',
    date: '13 Ago, 2023',
    time: '12:15',
    amount: 18.90,
    address: 'Av. Faria Lima, 2000 - São Paulo',
    items: 1
  }
];

const OrdersScreen = ({ navigation }) => {
  const renderStatusBadge = (status) => {
    let badgeStyle, statusText;
    
    switch(status) {
      case 'in_progress':
        badgeStyle = styles.inProgressBadge;
        statusText = 'Em andamento';
        break;
      case 'completed':
        badgeStyle = styles.completedBadge;
        statusText = 'Entregue';
        break;
      case 'canceled':
        badgeStyle = styles.canceledBadge;
        statusText = 'Cancelado';
        break;
      default:
        badgeStyle = styles.completedBadge;
        statusText = 'Entregue';
    }
    
    return (
      <View style={[styles.statusBadge, badgeStyle]}>
        <Text style={[
          styles.statusText, 
          status === 'canceled' ? styles.canceledText : 
          status === 'in_progress' ? styles.inProgressText : styles.completedText
        ]}>
          {statusText}
        </Text>
      </View>
    );
  };
  
  const handleOrderPress = (order) => {
    if (order.status === 'in_progress') {
      navigation.navigate('OrderDetail', { orderId: order.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {mockOrders.map(order => (
          <TouchableOpacity 
            key={order.id} 
            style={[
              styles.orderCard,
              order.status === 'in_progress' && styles.activeOrderCard
            ]}
            onPress={() => handleOrderPress(order)}
            activeOpacity={order.status === 'in_progress' ? 0.7 : 1}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>Pedido #{order.id}</Text>
                <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
              </View>
              {renderStatusBadge(order.status)}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.orderDetails}>
              {order.store && (
                <View style={styles.detailRow}>
                  <Icon name="store" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{order.store}</Text>
                </View>
              )}
              
              <View style={styles.detailRow}>
                <Icon name="map-marker-outline" size={16} color="#6B7280" />
                <Text style={styles.detailText}>{order.address}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Icon name="package-variant" size={16} color="#6B7280" />
                <Text style={styles.detailText}>{order.items} item(s)</Text>
              </View>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Total</Text>
                <Text style={styles.priceValue}>R$ {order.amount.toFixed(2)}</Text>
              </View>
              
              {order.status === 'in_progress' && (
                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => handleOrderPress(order)}
                >
                  <Text style={styles.viewDetailsText}>Ver detalhes</Text>
                  <Icon name="chevron-right" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
        
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
    backgroundColor: '#41B54A',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeOrderCard: {
    borderWidth: 1,
    borderColor: '#41B54A',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
  },
  canceledBadge: {
    backgroundColor: '#FEE2E2',
  },
  inProgressBadge: {
    backgroundColor: '#DBEAFE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  completedText: {
    color: '#059669',
  },
  canceledText: {
    color: '#DC2626',
  },
  inProgressText: {
    color: '#2563EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#41B54A',
  },
  viewDetailsButton: {
    backgroundColor: '#41B54A',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
    marginRight: 4,
  },
  spacer: {
    height: 80,
  },
});

export default OrdersScreen; 