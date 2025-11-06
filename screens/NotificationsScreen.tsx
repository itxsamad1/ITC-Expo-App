import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

const notifications = [
  {
    id: 1,
    title: 'New Driver Job Available',
    message: 'Truck Driver position available in Dubai, UAE. Apply now to secure your spot!',
    time: '1h ago',
    isRead: false,
    icon: '🚛',
    type: 'driver',
  },
  {
    id: 2,
    title: 'Security Guard Opportunity',
    message: 'Security Guard position in Doha, Qatar. Competitive salary and benefits package.',
    time: '3h ago',
    isRead: false,
    icon: '🛡️',
    type: 'security',
  },
  {
    id: 3,
    title: 'Car Driver Position',
    message: 'Luxury Car Driver needed in Riyadh, Saudi Arabia. Premium transport services company.',
    time: '5h ago',
    isRead: false,
    icon: '🚗',
    type: 'driver',
  },
  {
    id: 4,
    title: 'Application Status Update',
    message: 'Your application for Truck Driver at Global Logistics Ltd. is under review.',
    time: 'Yesterday',
    isRead: true,
    icon: '📋',
    type: 'driver',
  },
  {
    id: 5,
    title: 'Security Training Available',
    message: 'New security guard training program starting next week. Register now!',
    time: '2 days ago',
    isRead: true,
    icon: '🎓',
    type: 'security',
  },
  {
    id: 6,
    title: 'Heavy Truck Driver Needed',
    message: 'Heavy Truck Driver position in Abu Dhabi, UAE. Long-term contract available.',
    time: '2 days ago',
    isRead: true,
    icon: '🚚',
    type: 'driver',
  },
  {
    id: 7,
    title: 'Residential Security Position',
    message: 'Residential Security Guard job in Manama, Bahrain. Immediate start available.',
    time: '3 days ago',
    isRead: true,
    icon: '🏠',
    type: 'security',
  },
  {
    id: 8,
    title: 'Driving License Verification',
    message: 'Please verify your driving license details for faster job application processing.',
    time: '4 days ago',
    isRead: true,
    icon: '📄',
    type: 'driver',
  },
];

export const NotificationsScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          }}
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
        <Text className={`flex-1 text-center text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('notifications')}
        </Text>
        <View style={{ width: 40, height: 40 }} />
      </View>

      {/* Notifications List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 96 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`rounded-2xl p-4 flex-row ${
                isDark ? 'bg-[#0A2F47]' : 'bg-white'
              }`}
              activeOpacity={0.8}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
                borderLeftWidth: notification.isRead ? 0 : 4,
                borderLeftColor: notification.isRead ? 'transparent' : '#00C6A1',
              }}
            >
              <View style={{ marginRight: 12, paddingTop: 4 }}>
                {!notification.isRead && (
                  <View style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: '#00C6A1' }} />
                )}
                {notification.isRead && <View style={{ width: 10, height: 10 }} />}
              </View>
              <View className="flex-1">
                <Text className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {notification.title}
                </Text>
                <Text className={`text-base leading-5 mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {notification.message}
                </Text>
                <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {notification.time}
                </Text>
              </View>
              <View className="ml-3">
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)',
                  }}
                >
                  {notification.type === 'driver' && <Ionicons name="car-outline" size={22} color="#00C6A1" />}
                  {notification.type === 'security' && <Ionicons name="shield-outline" size={22} color="#00C6A1" />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
