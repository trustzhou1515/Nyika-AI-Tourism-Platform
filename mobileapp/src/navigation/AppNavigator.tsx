import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DestinationScreen from '../screens/DestinationScreen';
import PlannerScreen from '../screens/PlannerScreen';

export type RootStackParamList = {
  Main: undefined;
  Destination: { destinationId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Planner: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#050505', borderTopColor: '#1a1a1a' },
        tabBarActiveTintColor: '#ff8f3f',
        tabBarInactiveTintColor: '#9d9d9d'
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="Planner" component={PlannerScreen} options={{ tabBarLabel: 'Planner' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainTabs} />
        <RootStack.Screen name="Destination" component={DestinationScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
