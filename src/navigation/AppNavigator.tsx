import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplashScreen } from '../../screens/SplashScreen';
import { OnboardingScreen } from '../../screens/OnboardingScreen';
import { SignInScreen } from '../../screens/SignInScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { ExploreJobsScreen } from '../../screens/ExploreJobsScreen';
import { JobDetailsScreen } from '../../screens/JobDetailsScreen';
import { EventsScreen } from '../../screens/EventsScreen';
import { ResourcesScreen } from '../../screens/ResourcesScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { NotificationsScreen } from '../../screens/NotificationsScreen';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#052639' : '#FFFFFF',
          borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E5E5',
        },
        tabBarActiveTintColor: '#00C6A1',
        tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="JobsTab"
        component={ExploreJobsScreen}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="VisaTab"
        component={ResourcesScreen}
        options={{
          tabBarLabel: 'Visa',
          tabBarIcon: ({ color }) => (
            <Ionicons name="airplane-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isLoading) {
    return (
      <SplashScreen
        onFinish={() => {
          setIsLoading(false);
        }}
      />
    );
  }

  if (!hasSeenOnboarding) {
    return (
      <OnboardingScreen
        onGetStarted={() => {
          setHasSeenOnboarding(true);
        }}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <SignInScreen
        onSignIn={() => {
          console.log('Sign in pressed, setting authenticated to true');
          setIsAuthenticated(true);
        }}
        onSignUp={() => {
          console.log('Sign up pressed, setting authenticated to true');
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="ExploreJobs" component={ExploreJobsScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Resources" component={ResourcesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

