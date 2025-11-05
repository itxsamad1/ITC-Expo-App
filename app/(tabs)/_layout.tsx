import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function TabsLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <Ionicons name="briefcase-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="visa"
        options={{
          title: 'Visa',
          tabBarIcon: ({ color }) => <Ionicons name="airplane-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

