import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../src/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  { id: 1, title: 'My Applications', icon: 'send-outline', badge: '3', route: '/(tabs)/jobs' },
  { id: 2, title: 'Saved Jobs', icon: 'bookmark-outline', route: '/(tabs)/jobs' },
  { id: 3, title: 'Settings', icon: 'settings-outline', route: '/settings' },
];

const AUTH_STORAGE_KEY = '@itc_app:auth_state';

export const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleMenuPress = (route: string) => {
    router.push(route as never);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
              router.replace('/');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      <LinearGradient
        colors={['#00C6A1', '#052639']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: '100%',
          height: 208,
        }}
      >
        <View className="flex-row items-center justify-between px-6 pt-12 pb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Ionicons name="chevron-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Profile</Text>
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="items-center -mt-20 px-6">
          <View style={{ position: 'relative' }}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
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
          <Text className={`text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Abdul Samad
          </Text>
          <Text className={`text-base mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Software Engineer, seeking opportunities
          </Text>
        </View>

        <View className="px-6 mt-8 pb-8">
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
                  }}
                >
                  <Ionicons name={item.icon as any} size={22} color="#00C6A1" />
                </View>
                <Text className={`flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {item.title}
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

            <View style={{ height: 1, marginVertical: 16, backgroundColor: isDark ? 'rgba(55, 65, 81, 0.5)' : '#E5E7EB' }} />

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
                backgroundColor: isDark ? '#0a2e46' : '#FFFFFF',
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
              <Text className="flex-1 text-base font-semibold text-red-500">Logout</Text>
              <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
