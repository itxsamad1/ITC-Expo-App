import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';

const resources = [
  { id: 1, title: 'Work Visa', icon: '📋' },
  { id: 2, title: 'Labour Rights', icon: '⚖️' },
  { id: 3, title: 'Language Courses', icon: '🌐' },
  { id: 4, title: 'Networking Events', icon: '👥' },
  { id: 5, title: 'Cultural Integration', icon: '🌍' },
];

export const ResourcesScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
      {/* Header */}
      <LinearGradient
        colors={['#00C6A1', '#052639']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: '100%',
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 24,
        }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Ionicons name="chevron-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-center text-white">
            Resources & Guidance
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Resources List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              className={`flex-row items-center p-5 rounded-2xl ${
                isDark ? 'bg-[#0A2F47]' : 'bg-white'
              }`}
              activeOpacity={0.8}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View
                className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                style={{
                  backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)',
                }}
              >
                {resource.id === 1 && <MaterialCommunityIcons name="file-document-outline" size={24} color="#00C6A1" />}
                {resource.id === 2 && <MaterialCommunityIcons name="gavel" size={24} color="#00C6A1" />}
                {resource.id === 3 && <MaterialCommunityIcons name="translate" size={24} color="#00C6A1" />}
                {resource.id === 4 && <MaterialCommunityIcons name="account-group-outline" size={24} color="#00C6A1" />}
                {resource.id === 5 && <MaterialCommunityIcons name="earth" size={24} color="#00C6A1" />}
              </View>
              <Text className={`flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                {resource.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
