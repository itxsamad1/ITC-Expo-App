import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Menu items will be translated in the component
const menuItems = [
  { id: 1, titleKey: 'my_applications', icon: 'send-outline', badge: '3', route: '/(tabs)/jobs' },
  { id: 2, titleKey: 'saved_jobs', icon: 'bookmark-outline', route: '/(tabs)/jobs' },
  { id: 3, titleKey: 'settings', icon: 'settings-outline', route: '/settings' },
];

const AUTH_STORAGE_KEY = '@itc_app:auth_state';

export const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const handleMenuPress = (route: string) => {
    router.push(route as never);
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logout') + '?',
      [
        {
          text: t('cancel') || 'Cancel',
          style: 'cancel',
        },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear authentication state
              await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
              // Navigate to root which will show sign-in screen
              router.replace('/');
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
          backgroundColor: isDark ? '#052639' : '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
          }}
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold flex-1 text-center ${
            isDark ? 'text-white' : 'text-header-text'
          }`}
        >
          {t('profile')}
        </Text>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
          }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={{ alignItems: 'center', paddingTop: 32, paddingBottom: 32, paddingHorizontal: 24 }}>
          <View style={{ position: 'relative', marginBottom: 16 }}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt8oNhB0PWzIpTHhAe14QR7wLdnPMDYipV4plQjUO7tXbiqniy-GiQ8ZQxYFUG-Rdt3HA0L08llpySbOupbxuvRi5Z0NPVQSO0kZl3tQehpXAAY4jVQk6ZrqZFHGCvFbgRVLnKAKKQ59oCt882N5MogCiKqb7OTsoTQ3jmhChCl2P8icATiJjfUeBnuKrXxo8h44dJZZ7U5WRXMHUCVgduonyxKkoENgSyhmjIxQgszImAKXIZcFiJpQ3m-ZsV9wvHcjJUY5okIKo',
              }}
              style={{
                width: 128,
                height: 128,
                borderRadius: 9999,
                borderWidth: 4,
                borderColor: isDark ? '#052639' : '#FFFFFF',
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                width: 36,
                height: 36,
                borderRadius: 9999,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00C6A1',
                borderWidth: 3,
                borderColor: isDark ? '#052639' : '#FFFFFF',
              }}
            >
              <Ionicons name="create-outline" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`} style={{ marginBottom: 8 }}>
            Ahmed
          </Text>
          <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('driver')}
          </Text>
        </View>

        {/* Menu Items Section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <View style={{ gap: 12 }}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleMenuPress(item.route)}
                className={`flex-row items-center p-4 rounded-2xl ${
                  isDark ? 'bg-[#0a2e46]' : 'bg-white'
                }`}
                activeOpacity={0.8}
                style={{
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                    backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)',
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(0,198,161,0.3)' : 'rgba(0,198,161,0.2)',
                  }}
                >
                  <Ionicons name={item.icon as any} size={22} color="#00C6A1" />
                </View>
                <Text className={`flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {t(item.titleKey)}
                </Text>
                <View className="flex-row items-center">
                  {item.badge && (
                    <View
                      className="px-2.5 py-1 rounded-full mr-2"
                      style={{ backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)' }}
                    >
                      <Text className="text-primary text-xs font-bold">{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ height: 1, marginTop: 24, marginBottom: 24, backgroundColor: isDark ? 'rgba(55, 65, 81, 0.5)' : '#E5E7EB' }} />

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
                backgroundColor: isDark ? '#0a2e46' : '#FFFFFF',
                borderWidth: 1,
                borderColor: isDark ? 'rgba(239,68,68,0.3)' : '#FEE2E2',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
              activeOpacity={0.8}
            >
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Ionicons name="log-out-outline" size={22} color="#EF4444" />
              </View>
              <Text className="flex-1 text-base font-semibold text-red-500">{t('logout')}</Text>
              <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
