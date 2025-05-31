import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { LogBox, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingCartButton from '../components/FloatingCartButton';

// Telas de Autenticação
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';

// Telas Principais
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Telas de Lojas
import MoreStoresScreen from '../screens/stores/MoreStoresScreen';
import FamousStoresScreen from '../screens/stores/FamousStoresScreen';
import StoreScreen from '../screens/stores/StoreScreen';
import ProductDetailsScreen from '../screens/stores/ProductDetailsScreen';
import CartScreen from '../screens/stores/CartScreen';

// Telas de Checkout
import AddressConfirmationScreen from '../screens/checkout/AddressConfirmationScreen';
import PaymentScreen from '../screens/checkout/PaymentScreen';
import ReviewOrderScreen from '../screens/checkout/ReviewOrderScreen';
import OrderConfirmationScreen from '../screens/checkout/OrderConfirmationScreen';
import OrderTrackingScreen from '../screens/checkout/OrderTrackingScreen';

// Telas de Perfil e Funcionalidades
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import PersonalDataScreen from '../screens/profile/PersonalDataScreen';
import PaymentsScreen from '../screens/payments/PaymentsScreen';
import CardRegisterScreen from '../screens/payments/CardRegisterScreen';
import PaymentSelectorScreen from '../screens/payments/PaymentSelectorScreen';
import CouponsScreen from '../screens/coupons/CouponsScreen';
import ClubScreen from '../screens/club/ClubScreen';

// Telas de Chat
import ChatsScreen from '../screens/chats/ChatsScreen';
import ChatDetailScreen from '../screens/chats/ChatDetailScreen';

// Telas adicionais
import LoyaltyScreen from '../screens/loyalty/LoyaltyScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import InviteScreen from '../screens/invite/InviteScreen';
import DonationsScreen from '../screens/donations/DonationsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SecurityScreen from '../screens/security/SecurityScreen';
import HelpScreen from '../screens/help/HelpScreen';
import CarModeScreen from '../screens/car/CarModeScreen';
import SuggestStoreScreen from '../screens/suggest/SuggestStoreScreen';

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
const OrdersStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Navegador de Orders com tela de rastreamento
function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator 
      initialRouteName="OrdersList"
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right' 
      }}
    >
      <OrdersStack.Screen name="OrdersList" component={OrdersScreen} />
      <OrdersStack.Screen 
        name="OrderTracking" 
        component={OrderTrackingScreen}
        options={{
          animation: 'slide_from_right',
          presentation: 'card'
        }}
      />
      <OrdersStack.Screen 
        name="ChatWithDelivery" 
        component={ChatDetailScreen} 
        options={{
          animation: 'slide_from_right'
        }}
      />
    </OrdersStack.Navigator>
  );
}

// Navegadores para outras tabs
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

// Navegador Tab
function MyTabs() {
  const bottomInset = initialWindowMetrics?.insets.bottom || 0;
  const tabBarHeight = Platform.OS === 'ios' ? 70 : 60;

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: '#41B54A',
        headerShown: false,
        tabBarStyle: { 
          position: 'absolute',
          bottom: 0,
          height: Platform.OS === 'ios' ? tabBarHeight + (bottomInset > 0 ? 10 : 0) : tabBarHeight, 
          paddingBottom: Platform.OS === 'ios' ? 10 + (bottomInset > 0 ? bottomInset - 10 : 0) : 10,
          paddingTop: 5,
          zIndex: 10,
          elevation: 4,
          shadowOpacity: 0.1,
          shadowRadius: 2,
          backgroundColor: 'white',
          borderTopColor: '#E5E5E5'
        },
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 12 },
        tabBarIconStyle: { marginTop: 5 }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="magnify" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStackScreen}
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-list" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Componente principal de navegação
export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
          <Stack.Screen name="Main" component={MyTabs} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Addresses" component={AddressesScreen} />
          <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
          <Stack.Screen name="Payments" component={PaymentsScreen} />
          <Stack.Screen name="CardRegister" component={CardRegisterScreen} />
          <Stack.Screen name="PaymentSelector" component={PaymentSelectorScreen} />
          <Stack.Screen name="Coupons" component={CouponsScreen} />
          <Stack.Screen name="Club" component={ClubScreen} />
          <Stack.Screen name="Chats" component={ChatsScreen} />
          <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
          <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Feed" component={FeedScreen} />
          <Stack.Screen name="Invite" component={InviteScreen} />
          <Stack.Screen name="Donations" component={DonationsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Security" component={SecurityScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="CarMode" component={CarModeScreen} />
          <Stack.Screen name="SuggestStore" component={SuggestStoreScreen} />
          <Stack.Screen name="MoreStores" component={MoreStoresScreen} />
          <Stack.Screen name="FamousStores" component={FamousStoresScreen} />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          
          {/* Telas do fluxo de checkout */}
          <Stack.Screen name="AddressConfirmationScreen" component={AddressConfirmationScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="ReviewOrderScreen" component={ReviewOrderScreen} />
          <Stack.Screen name="OrderConfirmationScreen" component={OrderConfirmationScreen} />
        </Stack.Navigator>
        
        {/* Botão flutuante do carrinho */}
        <FloatingCartButton excludeScreens={[
          'Cart', 
          'ProductDetails', 
          'CartScreen', 
          'ProductDetailsScreen', 
          'Chats', 
          'ChatDetail', 
          'AddressConfirmationScreen', 
          'PaymentScreen', 
          'ReviewOrderScreen', 
          'OrderConfirmationScreen',
          'OrderTracking',
          'PaymentSelector'
        ]} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 