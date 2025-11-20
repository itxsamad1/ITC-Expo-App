import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

interface Question {
  key: string;
  question: string;
}

export const EligibilityCheckerScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    age: null,
    passport: null,
    medical: null,
    police: null,
    training: null,
    english: null,
  });

  const questions: Question[] = [
    { key: 'age', question: t('age_21_45') },
    { key: 'passport', question: t('passport_valid_2_years') },
    { key: 'medical', question: t('medically_fit') },
    { key: 'police', question: t('police_clearance_available') },
    { key: 'training', question: t('willing_training') },
    { key: 'english', question: t('english_basics') },
  ];

  const handleAnswer = (key: string, value: boolean) => {
    setAnswers({ ...answers, [key]: value });
  };

  const checkEligibility = () => {
    const allAnswered = Object.values(answers).every((answer) => answer !== null);
    if (!allAnswered) {
      Alert.alert(t('error'), 'Please answer all questions');
      return;
    }

    const allYes = Object.values(answers).every((answer) => answer === true);
    
    if (allYes) {
      Alert.alert(
        t('congratulations'),
        t('you_are_eligible'),
        [
          { text: t('cancel'), style: 'cancel' },
          {
            text: t('apply_job'),
            onPress: () => router.push('/(tabs)/jobs'),
          },
        ]
      );
    } else {
      Alert.alert(
        t('sorry'),
        t('not_eligible_message'),
        [
          { text: t('ok'), onPress: () => {} },
          {
            text: t('view_requirements'),
            onPress: () => router.push('/faqs'),
          },
        ]
      );
    }
  };

  const allAnswered = Object.values(answers).every((answer) => answer !== null);
  const isEligible = allAnswered && Object.values(answers).every((answer) => answer === true);

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
          {t('eligibility_checker')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('check_eligibility')}
        </Text>
        <Text className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Answer all questions to check if you're eligible for security guard positions in Czech Republic.
        </Text>

        <View style={{ gap: 20, marginBottom: 32 }}>
          {questions.map((q, index) => (
            <View
              key={q.key}
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
              <Text className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                {index + 1}. {q.question}
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => handleAnswer(q.key, true)}
                  className={`flex-1 py-3 rounded-xl items-center ${
                    answers[q.key] === true
                      ? 'bg-primary'
                      : isDark
                      ? 'bg-[#0F3E5E]'
                      : 'bg-gray-100'
                  }`}
                  style={{
                    borderWidth: 1,
                    borderColor:
                      answers[q.key] === true
                        ? '#00C6A1'
                        : isDark
                        ? 'rgba(255,255,255,0.15)'
                        : '#E5E7EB',
                  }}
                >
                  <Text
                    className={`font-semibold ${
                      answers[q.key] === true ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {t('yes')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAnswer(q.key, false)}
                  className={`flex-1 py-3 rounded-xl items-center ${
                    answers[q.key] === false
                      ? 'bg-red-500'
                      : isDark
                      ? 'bg-[#0F3E5E]'
                      : 'bg-gray-100'
                  }`}
                  style={{
                    borderWidth: 1,
                    borderColor:
                      answers[q.key] === false
                        ? '#EF4444'
                        : isDark
                        ? 'rgba(255,255,255,0.15)'
                        : '#E5E7EB',
                  }}
                >
                  <Text
                    className={`font-semibold ${
                      answers[q.key] === false ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {t('no')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={checkEligibility}
          className="rounded-xl h-14 items-center justify-center"
          activeOpacity={0.9}
          disabled={!allAnswered}
          style={{
            opacity: allAnswered ? 1 : 0.5,
          }}
        >
          <LinearGradient
            colors={['#00C6A1', '#00B894']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          />
          <Text className="text-white text-lg font-bold">{t('check_eligibility')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


