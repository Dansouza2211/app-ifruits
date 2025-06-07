import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox, Platform, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProfile } from '../contexts/ProfileContext';

// Telas de Autenticação
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LogoutScreen from '../screens/auth/LogoutScreen';

// Telas de Cadastro
import VehicleSelectionScreen from '../screens/registration/VehicleSelectionScreen';
import DocumentUploadScreen from '../screens/registration/DocumentUploadScreen';
import BankInfoScreen from '../screens/registration/BankInfoScreen';
import DocumentUploadCompleteScreen from '../screens/registration/DocumentUploadCompleteScreen';

// Telas principais
import HomeScreen from '../screens/home/HomeScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';
import ConversationScreen from '../screens/messages/ConversationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Telas de perfil
import MyDataScreen from '../screens/profile/MyDataScreen';
import MyVehicleScreen from '../screens/profile/MyVehicleScreen';
import PaymentsScreen from '../screens/profile/PaymentsScreen';
import EarningsHistoryScreen from '../screens/profile/EarningsHistoryScreen';
import DocumentsScreen from '../screens/profile/DocumentsScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import HelpScreen from '../screens/profile/HelpScreen';

// Ignorar avisos específicos
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  "[react-native-gesture-handler]",
  "expo-app-loading is deprecated"
]);

// Criação dos navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Renderizador de ícones para o Tab Navigator
const TabBarIcon = ({ name, focused, color }) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={name} size={24} color={focused ? '#41B54A' : '#9CA3AF'} />
    </View>
  );
};

// Navegador de abas principal
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#41B54A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="clipboard-list" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen} 
        options={{
          tabBarLabel: 'Mensagens',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="message-text-outline" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="account" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador de perfil
function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="MyData" component={MyDataScreen} />
      <Stack.Screen name="MyVehicle" component={MyVehicleScreen} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="EarningsHistory" component={EarningsHistoryScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
}

// Componente principal de navegação
export default function Navigation() {
  const { isAuthenticated, appLoading } = useProfile();

  // Se ainda estiver carregando dados do AsyncStorage, mostra a tela de splash
  if (appLoading) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'MainTabs' : 'Splash'}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          {/* Fluxo não autenticado */}
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="VehicleSelection" component={VehicleSelectionScreen} />
              <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
              <Stack.Screen name="BankInfo" component={BankInfoScreen} />
              <Stack.Screen name="DocumentUploadComplete" component={DocumentUploadCompleteScreen} />
            </>
          ) : (
            // Fluxo autenticado
            <>
              <Stack.Screen name="MainTabs" component={TabNavigator} />
              <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
              <Stack.Screen name="Conversation" component={ConversationScreen} />
              <Stack.Screen name="MyData" component={MyDataScreen} />
              <Stack.Screen name="MyVehicle" component={MyVehicleScreen} />
              <Stack.Screen name="Payments" component={PaymentsScreen} />
              <Stack.Screen name="EarningsHistory" component={EarningsHistoryScreen} />
              <Stack.Screen name="Documents" component={DocumentsScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Help" component={HelpScreen} />
              <Stack.Screen 
                name="Logout" 
                component={LogoutScreen}
                options={{
                  presentation: 'transparentModal',
                  animation: 'fade',
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Estilos para o navegador
const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 80 : 70,
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: -2 },
    backgroundColor: 'white',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    paddingHorizontal: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: Platform.OS === 'ios' ? 0 : 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    marginTop: 3,
  },
}); 