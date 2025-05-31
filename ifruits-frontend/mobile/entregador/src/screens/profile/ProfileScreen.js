import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const user = {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 99999-8888',
    photo: 'https://i.pravatar.cc/150?img=8',
    rating: 4.8,
    totalDeliveries: 158,
    vehicle: 'Moto',
    balance: 420.50
  };

  const menuItems = [
    { 
      id: '1', 
      title: 'Meus Dados', 
      icon: 'account-outline', 
      color: '#41B54A',
      onPress: () => navigation.navigate('MyData')
    },
    { 
      id: '2', 
      title: 'Meu Veículo', 
      icon: 'motorbike', 
      color: '#41B54A',
      onPress: () => navigation.navigate('MyVehicle')
    },
    { 
      id: '3', 
      title: 'Pagamentos', 
      icon: 'cash-multiple', 
      color: '#41B54A',
      onPress: () => navigation.navigate('Payments')
    },
    { 
      id: '4', 
      title: 'Histórico de Ganhos', 
      icon: 'chart-line', 
      color: '#41B54A',
      onPress: () => navigation.navigate('EarningsHistory')
    },
    { 
      id: '5', 
      title: 'Documentos', 
      icon: 'file-document-outline', 
      color: '#41B54A',
      onPress: () => navigation.navigate('Documents')
    },
    { 
      id: '6', 
      title: 'Configurações', 
      icon: 'cog-outline', 
      color: '#41B54A',
      onPress: () => navigation.navigate('Settings')
    },
    { 
      id: '7', 
      title: 'Ajuda', 
      icon: 'help-circle-outline', 
      color: '#41B54A',
      onPress: () => navigation.navigate('Help')
    },
    { 
      id: '8', 
      title: 'Sair', 
      icon: 'logout', 
      color: '#EF4444',
      onPress: () => handleLogout()
    }
  ];

  const handleTransfer = () => {
    navigation.navigate('Payments');
  };

  const handleLogout = () => {
    // Lógica para fazer logout
    navigation.navigate('Logout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: user.photo }} style={styles.profilePhoto} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#F59E0B" />
                <Text style={styles.ratingText}>{user.rating}</Text>
                <Text style={styles.deliveriesText}> • {user.totalDeliveries} entregas</Text>
              </View>
            </View>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Text style={styles.balanceValue}>R$ {user.balance.toFixed(2)}</Text>
            <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
              <Text style={styles.transferButtonText}>Transferir</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <Icon name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={[styles.menuItemText, item.id === '8' && styles.logoutText]}>
                {item.title}
              </Text>
              <Icon name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
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
  },
  profileCard: {
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 4,
  },
  deliveriesText: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 4,
  },
  transferButton: {
    backgroundColor: '#41B54A',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  logoutText: {
    color: '#EF4444',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  spacer: {
    height: 80,
  },
});

export default ProfileScreen;