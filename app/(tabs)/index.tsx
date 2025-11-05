import React from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const upcomingEvents = [
    {
      id: 1,
      title: 'Global Tech Summit',
      location: 'London, UK',
      date: 'NOV 23',
      icon: 'sparkles-outline',
    },
    {
      id: 2,
      title: 'Networking Night',
      location: 'Online Webinar',
      date: 'DEC 05',
      icon: 'globe-outline',
    },
    {
      id: 3,
      title: 'Resume Workshop',
      location: 'New York, USA',
      date: 'DEC 12',
      icon: 'school-outline',
    },
  ];

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
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
                  Welcome back,
                </Text>
                <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Hi Samad
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/notifications')}
              className="w-10 h-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
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
              placeholder="Search Jobs or Events…"
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
              { title: 'Career Matching', icon: 'briefcase-outline', route: '/jobs' },
              { title: 'Visa Support', icon: 'airplane-outline', route: '/visa' },
              { title: 'Events 2025', icon: 'calendar-outline', route: '/events' },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(action.route)}
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

        {/* Upcoming Events Section */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              Upcoming Events
            </Text>
            <TouchableOpacity onPress={() => router.push('/events')}>
              <Text className="text-primary text-sm font-semibold">See all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            {upcomingEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                onPress={() => router.push('/events')}
                className={`rounded-2xl p-4 flex-row items-center ${
                  isDark ? 'bg-[#0A2F47]' : 'bg-white'
                }`}
                activeOpacity={0.9}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)',
                  }}
                >
                  <Ionicons name={event.icon as any} size={22} color="#00C6A1" />
                </View>
                <View className="flex-1">
                  <Text className={`text-base font-semibold mb-1 ${
                    isDark ? 'text-white' : 'text-navy'
                  }`}>
                    {event.title}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {event.location}
                  </Text>
                </View>
                <Text className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

