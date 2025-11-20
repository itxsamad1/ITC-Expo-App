import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

interface TimelineStep {
  step: number;
  title: string;
  items: string[];
  duration?: string;
}

export const VisaTimelineScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const steps: TimelineStep[] = [
    {
      step: 1,
      title: t('registration_cv'),
      items: [t('upload_cnic'), t('upload_cv'), t('add_basic_info')],
    },
    {
      step: 2,
      title: t('medical_biometric'),
      items: [t('gamca_medical'), t('biometric_beoe'), t('upload_medical_report')],
      duration: '1-2 weeks',
    },
    {
      step: 3,
      title: t('training_pakistan'),
      items: [t('basic_training'), t('armed_training'), t('firearms_certification'), t('language_orientation')],
      duration: '4-5 weeks',
    },
    {
      step: 4,
      title: t('visa_processing'),
      items: [t('submit_passport'), t('visa_slip'), t('processing_time')],
      duration: '60-90 days',
    },
    {
      step: 5,
      title: t('protector_process'),
      items: [
        t('passport_copy'),
        t('visa_copy'),
        t('insurance_opf'),
        t('employment_contract'),
        t('ticket'),
        t('fee_challan'),
      ],
      duration: '5-7 days',
    },
    {
      step: 6,
      title: t('pre_departure'),
      items: [t('packing_list'), t('travel_briefing'), t('emergency_contacts'), t('flight_schedule')],
    },
    {
      step: 7,
      title: t('arrival_czech'),
      items: [t('register_3_days'), t('on_arrival_training'), t('accommodation_address'), t('safety_orientation')],
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
          {t('visa_timeline')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        {steps.map((step, index) => (
          <View key={step.step} style={{ marginBottom: 24 }}>
            <View className="flex-row items-start">
              <View className="items-center mr-4">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: '#00C6A1',
                    borderWidth: 3,
                    borderColor: isDark ? '#052639' : '#FFFFFF',
                  }}
                >
                  <Text className="text-white font-bold text-lg">{step.step}</Text>
                </View>
                {index < steps.length - 1 && (
                  <View
                    className="w-0.5 flex-1 mt-2"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
                      minHeight: 40,
                    }}
                  />
                )}
              </View>
              <View className="flex-1">
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
                  <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {t('step')} {step.step}: {step.title}
                  </Text>
                  {step.duration && (
                    <View className="flex-row items-center mb-3">
                      <Ionicons name="time-outline" size={16} color="#00C6A1" />
                      <Text className={`text-sm ml-2 text-primary font-semibold`}>
                        {t('estimated_duration')}: {step.duration}
                      </Text>
                    </View>
                  )}
                  <View style={{ gap: 8 }}>
                    {step.items.map((item, itemIndex) => (
                      <View key={itemIndex} className="flex-row items-start">
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color="#00C6A1"
                          style={{ marginRight: 8, marginTop: 2 }}
                        />
                        <Text className={`flex-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


