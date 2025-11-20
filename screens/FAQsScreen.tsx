import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const FAQsScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: t('how_long_visa'),
      answer: t('visa_processing_time'),
    },
    {
      id: '2',
      question: t('medical_requirements'),
      answer: t('medical_requirements_answer'),
    },
    {
      id: '3',
      question: t('protector_process_question'),
      answer: t('protector_process_answer'),
    },
    {
      id: '4',
      question: t('czech_certification'),
      answer: t('czech_certification_answer'),
    },
    {
      id: '5',
      question: t('accommodation_details'),
      answer: t('accommodation_details_answer'),
    },
    {
      id: '6',
      question: t('savings_potential'),
      answer: t('savings_potential_answer'),
    },
    {
      id: '7',
      question: t('working_hours'),
      answer: t('working_hours_answer'),
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
        <Text className={`text-xl font-bold flex-1 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('faqs')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('faqs')}
        </Text>
        <Text className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Find answers to commonly asked questions
        </Text>

        <View style={{ gap: 12 }}>
          {faqs.map((faq) => (
            <View
              key={faq.id}
              className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
              <TouchableOpacity
                onPress={() => toggleFAQ(faq.id)}
                className="p-4 flex-row items-center justify-between"
                activeOpacity={0.7}
              >
                <Text className={`flex-1 text-base font-semibold mr-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {faq.question}
                </Text>
                <Ionicons
                  name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={isDark ? '#9CA3AF' : '#6B7280'}
                />
              </TouchableOpacity>
              {expandedId === faq.id && (
                <View
                  className="px-4 pb-4"
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
                  }}
                >
                  <Text className={`text-sm mt-3 leading-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


