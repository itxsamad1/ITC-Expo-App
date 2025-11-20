import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

// Resources will be translated in the component
const resources = [
  { id: 1, titleKey: 'work_visa', icon: 'document-text-outline' },
  { id: 2, titleKey: 'labour_rights', icon: 'scale-outline' },
  { id: 3, titleKey: 'language_courses', icon: 'globe-outline' },
  { id: 4, titleKey: 'networking_events', icon: 'people-outline' },
  { id: 5, titleKey: 'cultural_integration', icon: 'earth-outline' },
];

export const ResourcesScreen: React.FC = () => {
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
          {t('resources_guidance')}
        </Text>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
          }}
        >
          <Ionicons name="search-outline" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
      </View>

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
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
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
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(0,198,161,0.3)' : 'rgba(0,198,161,0.2)',
                }}
              >
                <Ionicons name={resource.icon as any} size={24} color="#00C6A1" />
              </View>
              <Text className={`flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                {t(resource.titleKey)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
