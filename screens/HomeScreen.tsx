import React from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className={`px-6 pt-4 pb-3 ${isDark ? 'bg-background-dark' : 'bg-white'}`}>
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt8oNhB0PWzIpTHhAe14QR7wLdnPMDYipV4plQjUO7tXbiqniy-GiQ8ZQxYFUG-Rdt3HA0L08llpySbOupbxuvRi5Z0NPVQSO0kZl3tQehpXAAY4jVQk6ZrqZFHGCvFbgRVLnKAKKQ59oCt882N5MogCiKqb7OTsoTQ3jmhChCl2P8icATiJjfUeBnuKrXxo8h44dJZZ7U5WRXMHUCVgduonyxKkoENgSyhmjIxQgszImAKXIZcFiJpQ3m-ZsV9wvHcjJUY5okIKo',
                }}
                className="w-12 h-12 rounded-full mr-3"
                style={{ borderWidth: 2, borderColor: isDark ? '#00C6A1' : '#E5E7EB' }}
              />
              <View>
                <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-0.5`}>
                  {t('welcome_back')},
                </Text>
                <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {t('hi')} Ahmed
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/notifications')}
              className="w-10 h-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color={isDark ? '#fff' : '#111827'} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View
            className={`flex-row items-center rounded-2xl h-14 px-4 ${
              isDark ? 'bg-[#0A2E44]' : 'bg-gray-50'
            }`}
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
            <Ionicons name="search-outline" size={20} color="#00C6A1" style={{ marginRight: 12 }} />
            <TextInput
              className={`flex-1 text-base ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              placeholder={t('search') + '...'}
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            />
          </View>

        </View>

        {/* Quick Actions */}
        <View className="px-6 py-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {[
              { title: t('visa_support'), icon: 'airplane-outline', route: '/resources' },
              { title: t('training'), icon: 'school-outline', route: '/training' },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(action.route as any)}
                className="mr-4"
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#00C6A1', '#052639']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    padding: 20,
                    width: 144,
                    height: 128,
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.2)',
                    shadowColor: '#00C6A1',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Ionicons name={action.icon as any} size={28} color="#fff" />
                  <Text className="text-white text-sm font-semibold leading-tight mt-3">
                    {action.title}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Trainings Section */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {t('upcoming_trainings')}
            </Text>
            <TouchableOpacity onPress={() => router.push('/training')}>
              <Text className="text-primary text-sm font-semibold">{t('see_all')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
