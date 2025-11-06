import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';

export const SettingsScreen: React.FC = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
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
          }}
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
        <Text className={`flex-1 text-center text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
          Settings
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
        {/* Theme Toggle Section */}
        <View
          className={`rounded-2xl p-5 mb-6 ${
            isDark ? 'bg-[#0A2F47]' : 'bg-white'
          }`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Appearance
          </Text>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}
            activeOpacity={0.7}
            onPress={toggleTheme}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
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
                <Ionicons 
                  name={isDark ? 'moon' : 'sunny'} 
                  size={22} 
                  color="#00C6A1" 
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Dark Mode
                </Text>
                <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isDark ? 'Dark mode is enabled' : 'Light mode is enabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D5DB', true: '#00C6A1' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D5DB"
            />
          </TouchableOpacity>
        </View>

        {/* Other Settings Sections */}
        <View
          className={`rounded-2xl p-5 mb-6 ${
            isDark ? 'bg-[#0A2F47]' : 'bg-white'
          }`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Account
          </Text>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
            }}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="person-outline" 
              size={20} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
              style={{ marginRight: 16 }}
            />
            <Text className={`flex-1 text-base ${isDark ? 'text-white' : 'text-navy'}`}>
              Edit Profile
            </Text>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="lock-closed-outline" 
              size={20} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
              style={{ marginRight: 16 }}
            />
            <Text className={`flex-1 text-base ${isDark ? 'text-white' : 'text-navy'}`}>
              Change Password
            </Text>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View
          className={`rounded-2xl p-5 ${
            isDark ? 'bg-[#0A2F47]' : 'bg-white'
          }`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            About
          </Text>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
            }}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="information-circle-outline" 
              size={20} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
              style={{ marginRight: 16 }}
            />
            <Text className={`flex-1 text-base ${isDark ? 'text-white' : 'text-navy'}`}>
              App Version
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              1.0.0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="help-circle-outline" 
              size={20} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
              style={{ marginRight: 16 }}
            />
            <Text className={`flex-1 text-base ${isDark ? 'text-white' : 'text-navy'}`}>
              Help & Support
            </Text>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

