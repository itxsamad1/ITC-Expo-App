import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

interface StatusStep {
  key: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
  description: string;
  duration?: string;
}

export const ApplicationStatusScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  // Mock data - in real app, this would come from API
  const steps: StatusStep[] = [
    {
      key: 'submitted',
      label: t('application_submitted'),
      status: 'completed',
      description: 'Your application has been received',
      duration: '1 day',
    },
    {
      key: 'shortlisted',
      label: t('shortlisted'),
      status: 'completed',
      description: 'You have been shortlisted for interview',
      duration: '3 days',
    },
    {
      key: 'interview',
      label: t('interview_scheduled'),
      status: 'current',
      description: 'Interview scheduled for next week',
      duration: '5 days',
    },
    {
      key: 'medical',
      label: t('medical_cleared'),
      status: 'pending',
      description: 'Complete medical examination',
      duration: '7 days',
    },
    {
      key: 'training',
      label: t('training_completed'),
      status: 'pending',
      description: 'Complete required training',
      duration: '4 weeks',
    },
    {
      key: 'visa',
      label: t('visa_approved'),
      status: 'pending',
      description: 'Visa processing',
      duration: '60-90 days',
    },
    {
      key: 'protector',
      label: t('protector_approved'),
      status: 'pending',
      description: 'Protector process',
      duration: '5 days',
    },
    {
      key: 'ticket',
      label: t('ticket_issued'),
      status: 'pending',
      description: 'Flight ticket will be issued',
      duration: '2 days',
    },
    {
      key: 'deployment',
      label: t('deployment'),
      status: 'pending',
      description: 'Ready for deployment',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'current':
        return 'radio-button-on';
      default:
        return 'ellipse-outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#00C6A1';
      case 'current':
        return '#00C6A1';
      default:
        return isDark ? '#6B7280' : '#9CA3AF';
    }
  };

  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progress = (completedCount / steps.length) * 100;

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
          {t('application_status')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View
          className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
          <View className="flex-row items-center justify-between mb-3">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {t('current_status')}
            </Text>
            <Text className={`text-sm font-semibold text-primary`}>
              {Math.round(progress)}%
            </Text>
          </View>
          <View
            className="h-3 rounded-full"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
            }}
          >
            <View
              className="h-3 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: '#00C6A1',
              }}
            />
          </View>
          <Text className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {completedCount} of {steps.length} steps completed
          </Text>
        </View>

        {/* Status Steps */}
        <View style={{ gap: 16 }}>
          {steps.map((step, index) => (
            <View
              key={step.key}
              className={`flex-row ${isDark ? 'bg-[#0A2F47]' : 'bg-white'} rounded-2xl p-4`}
              style={{
                borderWidth: 1,
                borderColor:
                  step.status === 'current'
                    ? '#00C6A1'
                    : isDark
                    ? 'rgba(255,255,255,0.15)'
                    : '#E5E7EB',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View className="items-center mr-4">
                <Ionicons
                  name={getStatusIcon(step.status) as any}
                  size={28}
                  color={getStatusColor(step.status)}
                />
                {index < steps.length - 1 && (
                  <View
                    className="w-0.5 flex-1 mt-2"
                    style={{
                      backgroundColor:
                        step.status === 'completed'
                          ? '#00C6A1'
                          : isDark
                          ? 'rgba(255,255,255,0.1)'
                          : '#E5E7EB',
                    }}
                  />
                )}
              </View>
              <View className="flex-1">
                <Text className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {step.label}
                </Text>
                <Text className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.description}
                </Text>
                {step.duration && (
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color={isDark ? '#6B7280' : '#9CA3AF'} />
                    <Text className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {t('estimated_duration')}: {step.duration}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

