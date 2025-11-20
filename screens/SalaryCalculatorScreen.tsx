import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

interface SalaryData {
  gross: number;
  net: number;
  monthly: number;
  yearly: number;
  nightShift: number;
  annualLeave: number;
}

const salaryRates = {
  unarmed: { gross: 30000, net: 24000, czk: 'CZK' },
  armed: { gross: 55000, net: 42000, czk: 'CZK' },
  supervisor: { gross: 75000, net: 56000, czk: 'CZK' },
};

export const SalaryCalculatorScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<'unarmed' | 'armed' | 'supervisor'>('unarmed');

  const calculateSalary = (): SalaryData => {
    const rate = salaryRates[selectedCategory];
    const nightShiftAllowance = rate.net * 0.25; // 25% extra
    const annualLeaveValue = (rate.net / 12) * (20 / 30); // 20 days annual leave
    const accommodationSavings = 15000; // Estimated accommodation cost saved

    return {
      gross: rate.gross,
      net: rate.net,
      monthly: rate.net + nightShiftAllowance,
      yearly: rate.net * 12,
      nightShift: nightShiftAllowance,
      annualLeave: annualLeaveValue,
    };
  };

  const salary = calculateSalary();
  const selectedLabel =
    selectedCategory === 'unarmed'
      ? t('unarmed_guard')
      : selectedCategory === 'armed'
      ? t('armed_guard')
      : t('supervisor');

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
          {t('salary_calculator')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('choose_category')}
        </Text>
        <Text className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Select your job category to see salary breakdown
        </Text>

        {/* Category Selection */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          {(['unarmed', 'armed', 'supervisor'] as const).map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`rounded-2xl p-4 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
              style={{
                borderWidth: 2,
                borderColor:
                  selectedCategory === category
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
              <View className="flex-row items-center justify-between">
                <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {category === 'unarmed'
                    ? t('unarmed_guard')
                    : category === 'armed'
                    ? t('armed_guard')
                    : t('supervisor')}
                </Text>
                {selectedCategory === category && (
                  <Ionicons name="checkmark-circle" size={24} color="#00C6A1" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Salary Breakdown */}
        <View
          className={`rounded-2xl p-6 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
          <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            {selectedLabel} - {t('salary_breakdown')}
          </Text>

          <View style={{ gap: 16 }}>
            <View className="flex-row justify-between items-center pb-3 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
              <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('gross_salary')}
              </Text>
              <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                {salary.gross.toLocaleString()} {t('czk')}
              </Text>
            </View>

            <View className="flex-row justify-between items-center pb-3 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
              <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('net_salary')} ({t('after_taxes')})
              </Text>
              <Text className={`text-lg font-bold text-primary`}>
                {salary.net.toLocaleString()} {t('czk')}
              </Text>
            </View>

            <View className="flex-row justify-between items-center pb-3 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
              <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('night_shift_allowance')} (25%)
              </Text>
              <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                +{salary.nightShift.toLocaleString()} {t('czk')}
              </Text>
            </View>

            <View className="flex-row justify-between items-center pb-3 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
              <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('annual_leave')} (20 {t('days')})
              </Text>
              <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                {salary.annualLeave.toLocaleString()} {t('czk')}
              </Text>
            </View>

            <View className="flex-row justify-between items-center pb-3 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
              <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('accommodation_savings')}
              </Text>
              <Text className={`text-base font-semibold text-green-500`}>
                +15,000 {t('czk')}
              </Text>
            </View>

            <View
              className="mt-4 p-4 rounded-xl"
              style={{
                backgroundColor: isDark ? 'rgba(0,198,161,0.1)' : '#E6FFFA',
                borderWidth: 1,
                borderColor: '#00C6A1',
              }}
            >
              <Text className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('monthly_earnings')} (with night shift)
              </Text>
              <Text className={`text-2xl font-bold text-primary`}>
                {salary.monthly.toLocaleString()} {t('czk')}
              </Text>
              <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ≈ ${(salary.monthly / 22).toFixed(0)} {t('usd')} / {(salary.monthly * 12.5).toFixed(0)} {t('pkr')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


