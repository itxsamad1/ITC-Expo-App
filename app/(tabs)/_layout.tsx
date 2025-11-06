import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useLanguage } from '../../src/contexts/LanguageContext';

export default function TabsLayout() {
  const { theme } = useTheme();
  const { t } = useLanguage();
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
          title: t('home'),
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: t('notifications'),
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: t('jobs'),
          tabBarIcon: ({ color }) => <Ionicons name="briefcase-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="visa"
        options={{
          title: t('visa_support'),
          tabBarIcon: ({ color }) => <Ionicons name="airplane-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

