import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  const [settings, setSettings] = useState({
    notifications: {
      newOrders: true,
      statusUpdates: true,
      promotions: false,
      accountAlerts: true
    },
    app: {
      darkMode: false,
      biometricAuth: true,
      autoAcceptOrders: false,
      dataSaver: true,
      locationAccess: 'always', // 'always', 'using', 'never'
      language: 'pt-BR'
    },
    privacy: {
      shareLocation: true,
      shareActivityData: false,
      allowAnalytics: true
    }
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleSetting = (category, setting) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [setting]: !prevSettings[category][setting]
      }
    }));
  };

  const handleSetLocationAccess = (value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      app: {
        ...prevSettings.app,
        locationAccess: value
      }
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Novos pedidos disponíveis</Text>
              <Text style={styles.settingDescription}>
                Receba alertas quando novos pedidos estiverem disponíveis para entrega
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.notifications.newOrders ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('notifications', 'newOrders')}
              value={settings.notifications.newOrders}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Atualizações de status</Text>
              <Text style={styles.settingDescription}>
                Receba notificações sobre mudanças no status das suas entregas
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.notifications.statusUpdates ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('notifications', 'statusUpdates')}
              value={settings.notifications.statusUpdates}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Promoções e novidades</Text>
              <Text style={styles.settingDescription}>
                Receba ofertas especiais, incentivos e atualizações sobre o app
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.notifications.promotions ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('notifications', 'promotions')}
              value={settings.notifications.promotions}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Alertas da conta</Text>
              <Text style={styles.settingDescription}>
                Receba notificações sobre alterações na sua conta ou documentação
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.notifications.accountAlerts ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('notifications', 'accountAlerts')}
              value={settings.notifications.accountAlerts}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Aplicativo</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Modo escuro</Text>
              <Text style={styles.settingDescription}>
                Altere a aparência do aplicativo para o modo escuro
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.app.darkMode ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('app', 'darkMode')}
              value={settings.app.darkMode}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Autenticação biométrica</Text>
              <Text style={styles.settingDescription}>
                Use impressão digital ou reconhecimento facial para fazer login
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.app.biometricAuth ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('app', 'biometricAuth')}
              value={settings.app.biometricAuth}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Aceitar pedidos automaticamente</Text>
              <Text style={styles.settingDescription}>
                Aceitar automaticamente pedidos que correspondam às suas preferências
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.app.autoAcceptOrders ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('app', 'autoAcceptOrders')}
              value={settings.app.autoAcceptOrders}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Economia de dados</Text>
              <Text style={styles.settingDescription}>
                Reduzir o uso de dados móveis enquanto usa o aplicativo
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.app.dataSaver ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('app', 'dataSaver')}
              value={settings.app.dataSaver}
            />
          </View>

          <View style={styles.settingItemWithOptions}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Acesso à localização</Text>
              <Text style={styles.settingDescription}>
                Determina quando o aplicativo pode acessar sua localização
              </Text>
            </View>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={[
                  styles.optionButton, 
                  settings.app.locationAccess === 'always' && styles.optionButtonActive
                ]}
                onPress={() => handleSetLocationAccess('always')}
              >
                <Text style={[
                  styles.optionText,
                  settings.app.locationAccess === 'always' && styles.optionTextActive
                ]}>Sempre</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.optionButton, 
                  settings.app.locationAccess === 'using' && styles.optionButtonActive
                ]}
                onPress={() => handleSetLocationAccess('using')}
              >
                <Text style={[
                  styles.optionText,
                  settings.app.locationAccess === 'using' && styles.optionTextActive
                ]}>Usando o app</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.optionButton, 
                  settings.app.locationAccess === 'never' && styles.optionButtonActive
                ]}
                onPress={() => handleSetLocationAccess('never')}
              >
                <Text style={[
                  styles.optionText,
                  settings.app.locationAccess === 'never' && styles.optionTextActive
                ]}>Nunca</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Privacidade</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Compartilhar localização</Text>
              <Text style={styles.settingDescription}>
                Compartilhar sua localização em tempo real com clientes durante entregas
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.privacy.shareLocation ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('privacy', 'shareLocation')}
              value={settings.privacy.shareLocation}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Compartilhar dados de atividade</Text>
              <Text style={styles.settingDescription}>
                Compartilhar estatísticas de entrega para melhorar os algoritmos de pareamento
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.privacy.shareActivityData ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('privacy', 'shareActivityData')}
              value={settings.privacy.shareActivityData}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Permitir análise de dados</Text>
              <Text style={styles.settingDescription}>
                Permitir coleta de dados anônimos para melhorar o serviço
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
              thumbColor={settings.privacy.allowAnalytics ? '#41B54A' : '#F9FAFB'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => handleToggleSetting('privacy', 'allowAnalytics')}
              value={settings.privacy.allowAnalytics}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Limpar cache do aplicativo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.dangerButton, styles.deleteButton]}>
            <Text style={styles.dangerButtonText}>Excluir minha conta</Text>
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingItemWithOptions: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  optionButtonActive: {
    backgroundColor: '#D1FAE5',
  },
  optionText: {
    fontSize: 12,
    color: '#4B5563',
  },
  optionTextActive: {
    color: '#065F46',
    fontWeight: '500',
  },
  dangerButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    marginTop: 16,
  },
  dangerButtonText: {
    color: '#B91C1C',
    fontWeight: '500',
    fontSize: 16,
  },
  spacer: {
    height: 40,
  },
});

export default SettingsScreen; 