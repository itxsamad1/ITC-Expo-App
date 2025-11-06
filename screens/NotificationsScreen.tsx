import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';

const notifications = [
  {
    id: 1,
    title: 'New Job Match',
    message: "A new role matching your 'Software Engineer' profile has been posted.",
    time: '2h ago',
    isRead: false,
    icon: '💼',
  },
  {
    id: 2,
    title: 'Resource Update',
    message: "Your language resource 'Advanced English Grammar' has been updated.",
    time: 'Yesterday',
    isRead: false,
    icon: '📚',
  },
  {
    id: 3,
    title: 'Visa Update',
    message: "There's an update on your visa application process.",
    time: '2 days ago',
    isRead: true,
    icon: '✈️',
  },
  {
    id: 4,
    title: 'Profile View',
    message: 'A recruiter from TechSolutions Inc. viewed your profile.',
    time: '3 days ago',
    isRead: true,
    icon: '👁️',
  },
];

export const NotificationsScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
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
          Notifications
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
                  {notification.id === 1 && <Ionicons name="briefcase-outline" size={22} color="#00C6A1" />}
                  {notification.id === 2 && <Ionicons name="book-outline" size={22} color="#00C6A1" />}
                  {notification.id === 3 && <Ionicons name="airplane-outline" size={22} color="#00C6A1" />}
                  {notification.id === 4 && <Ionicons name="eye-outline" size={22} color="#00C6A1" />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
