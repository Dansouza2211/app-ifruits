import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const EarningsHistoryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('week');
  
  const earningsData = {
    week: {
      total: 420.50,
      period: '15 a 21 de Maio, 2023',
      days: [
        { day: 'Segunda', date: '15/05', amount: 85.30, deliveries: 8 },
        { day: 'Terça', date: '16/05', amount: 75.50, deliveries: 7 },
        { day: 'Quarta', date: '17/05', amount: 90.00, deliveries: 9 },
        { day: 'Quinta', date: '18/05', amount: 65.20, deliveries: 6 },
        { day: 'Sexta', date: '19/05', amount: 78.90, deliveries: 8 },
        { day: 'Sábado', date: '20/05', amount: 25.60, deliveries: 3 },
        { day: 'Domingo', date: '21/05', amount: 0, deliveries: 0 }
      ]
    },
    month: {
      total: 1854.75,
      period: 'Maio, 2023',
      weeks: [
        { week: 'Semana 1', period: '01 a 07/05', amount: 468.25 },
        { week: 'Semana 2', period: '08 a 14/05', amount: 512.30 },
        { week: 'Semana 3', period: '15 a 21/05', amount: 420.50 },
        { week: 'Semana 4', period: '22 a 28/05', amount: 453.70 }
      ]
    },
    year: {
      total: 7945.60,
      period: '2023',
      months: [
        { month: 'Janeiro', amount: 1245.30 },
        { month: 'Fevereiro', amount: 1350.80 },
        { month: 'Março', amount: 1563.20 },
        { month: 'Abril', amount: 1931.55 },
        { month: 'Maio', amount: 1854.75 }
      ]
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderDailyEarnings = ({ item }) => (
    <View style={styles.earningItem}>
      <View style={styles.earningDayContainer}>
        <Text style={styles.earningDay}>{item.day}</Text>
        <Text style={styles.earningDate}>{item.date}</Text>
      </View>
      <View style={styles.earningDetailsContainer}>
        <Text style={styles.earningDeliveries}>{item.deliveries} entregas</Text>
        <Text style={styles.earningAmount}>R$ {item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderWeeklyEarnings = ({ item }) => (
    <View style={styles.earningItem}>
      <View style={styles.earningDayContainer}>
        <Text style={styles.earningDay}>{item.week}</Text>
        <Text style={styles.earningDate}>{item.period}</Text>
      </View>
      <View style={styles.earningDetailsContainer}>
        <Text style={styles.earningAmount}>R$ {item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderMonthlyEarnings = ({ item }) => (
    <View style={styles.earningItem}>
      <View style={styles.earningDayContainer}>
        <Text style={styles.earningDay}>{item.month}</Text>
      </View>
      <View style={styles.earningDetailsContainer}>
        <Text style={styles.earningAmount}>R$ {item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'week':
        return (
          <>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryPeriod}>{earningsData.week.period}</Text>
              <Text style={styles.summaryAmount}>R$ {earningsData.week.total.toFixed(2)}</Text>
            </View>
            <FlatList
              data={earningsData.week.days}
              renderItem={renderDailyEarnings}
              keyExtractor={(item) => item.day}
              scrollEnabled={false}
            />
          </>
        );
      case 'month':
        return (
          <>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryPeriod}>{earningsData.month.period}</Text>
              <Text style={styles.summaryAmount}>R$ {earningsData.month.total.toFixed(2)}</Text>
            </View>
            <FlatList
              data={earningsData.month.weeks}
              renderItem={renderWeeklyEarnings}
              keyExtractor={(item) => item.week}
              scrollEnabled={false}
            />
          </>
        );
      case 'year':
        return (
          <>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryPeriod}>{earningsData.year.period}</Text>
              <Text style={styles.summaryAmount}>R$ {earningsData.year.total.toFixed(2)}</Text>
            </View>
            <FlatList
              data={earningsData.year.months}
              renderItem={renderMonthlyEarnings}
              keyExtractor={(item) => item.month}
              scrollEnabled={false}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Ganhos</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'week' && styles.activeTabButton]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'month' && styles.activeTabButton]}
          onPress={() => setActiveTab('month')}
        >
          <Text style={[styles.tabText, activeTab === 'month' && styles.activeTabText]}>Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'year' && styles.activeTabButton]}
          onPress={() => setActiveTab('year')}
        >
          <Text style={[styles.tabText, activeTab === 'year' && styles.activeTabText]}>Ano</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.graphContainer}>
          <View style={styles.graphPlaceholder}>
            <Icon name="chart-line" size={60} color="#41B54A" />
            <Text style={styles.graphText}>Gráfico de Ganhos</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {renderContent()}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#41B54A',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#41B54A',
  },
  scrollView: {
    flex: 1,
  },
  graphContainer: {
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
  graphPlaceholder: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  graphText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  contentContainer: {
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
  summaryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 16,
    marginBottom: 16,
  },
  summaryPeriod: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  earningDayContainer: {
    flex: 1,
  },
  earningDay: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  earningDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  earningDetailsContainer: {
    alignItems: 'flex-end',
  },
  earningDeliveries: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  earningAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  spacer: {
    height: 40,
  },
});

export default EarningsHistoryScreen; 