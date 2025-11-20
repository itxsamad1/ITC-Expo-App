import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

interface CostItem {
  id: string;
  name: string;
  amount: number;
  currency: string;
  description: string;
}

export const CostBreakdownScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const costs: CostItem[] = [
    {
      id: '1',
      name: t('visa_cost'),
      amount: 5000,
      currency: 'PKR',
      description: 'Visa processing fee',
    },
    {
      id: '2',
      name: t('medical_cost'),
      amount: 15000,
      currency: 'PKR',
      description: 'GAMCA medical examination',
    },
    {
      id: '3',
      name: t('protector_fee'),
      amount: 2000,
      currency: 'PKR',
      description: 'Protectorate of Emigrants fee',
    },
    {
      id: '4',
      name: t('insurance_cost'),
      amount: 10000,
      currency: 'PKR',
      description: 'OPF insurance (one-time)',
    },
    {
      id: '5',
      name: t('ticket_cost'),
      amount: 80000,
      currency: 'PKR',
      description: 'Flight ticket to Czech Republic',
    },
  ];

  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);

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
          {t('cost_breakdown')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <View
          className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}
          style={{
            borderWidth: 1,
            borderColor: isDark ? 'rgba(59,130,246,0.3)' : '#BFDBFE',
          }}
        >
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={24} color="#3B82F6" style={{ marginRight: 12 }} />
            <Text className={`flex-1 text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
              {t('cost_transparency')}
            </Text>
          </View>
        </View>

        <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('mandatory_costs')}
        </Text>

        <View style={{ gap: 12, marginBottom: 24 }}>
          {costs.map((cost) => (
            <View
              key={cost.id}
              className={`rounded-2xl p-4 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
              <View className="flex-row items-center justify-between mb-2">
                <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {cost.name}
                </Text>
                <Text className={`text-lg font-bold text-primary`}>
                  {cost.amount.toLocaleString()} {cost.currency}
                </Text>
              </View>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {cost.description}
              </Text>
            </View>
          ))}
        </View>

        <View
          className={`rounded-2xl p-6 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
          style={{
            borderWidth: 2,
            borderColor: '#00C6A1',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {t('total_cost')}
            </Text>
            <Text className={`text-2xl font-bold text-primary`}>
              {totalCost.toLocaleString()} PKR
            </Text>
          </View>
          <Text className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            ≈ ${(totalCost / 280).toFixed(0)} USD / {(totalCost * 0.0035).toFixed(0)} CZK
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};


