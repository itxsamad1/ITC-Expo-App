import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

interface ContactItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  action: () => void;
  color: string;
}

export const SupportScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const contacts: ContactItem[] = [
    {
      id: '1',
      title: t('live_chat'),
      subtitle: 'Chat with our support team',
      icon: 'chatbubbles-outline',
      action: () => {
        // TODO: Implement live chat
        alert('Live chat will be implemented');
      },
      color: '#00C6A1',
    },
    {
      id: '2',
      title: t('application_manager'),
      subtitle: '+92 300 1234567',
      icon: 'person-outline',
      action: () => Linking.openURL('tel:+923001234567'),
      color: '#3B82F6',
    },
    {
      id: '3',
      title: t('emergency_helpline'),
      subtitle: '+92 300 1234568',
      icon: 'call-outline',
      action: () => Linking.openURL('tel:+923001234568'),
      color: '#EF4444',
    },
    {
      id: '4',
      title: t('email_us'),
      subtitle: 'support@itc.com',
      icon: 'mail-outline',
      action: () => Linking.openURL('mailto:support@itc.com'),
      color: '#8B5CF6',
    },
  ];

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
        <Text className={`text-xl font-bold flex-1 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('support')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('contact_us')}
        </Text>
        <Text className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Get help and support for your application
        </Text>

        <View style={{ gap: 16, marginBottom: 24 }}>
          {contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              onPress={contact.action}
              className={`rounded-2xl p-5 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
              <View className="flex-row items-center">
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                  style={{
                    backgroundColor: `${contact.color}20`,
                    borderWidth: 1,
                    borderColor: `${contact.color}40`,
                  }}
                >
                  <Ionicons name={contact.icon as any} size={28} color={contact.color} />
                </View>
                <View className="flex-1">
                  <Text className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {contact.title}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {contact.subtitle}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Office Address */}
        <View
          className={`rounded-2xl p-5 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
          <View className="flex-row items-start mb-3">
            <Ionicons name="location-outline" size={24} color="#00C6A1" style={{ marginRight: 12 }} />
            <View className="flex-1">
              <Text className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                {t('itc_office_address')}
              </Text>
              <Text className={`text-sm leading-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                ITC Office, Main Boulevard,
                {'\n'}Karachi, Pakistan
                {'\n'}Phone: +92 21 12345678
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


