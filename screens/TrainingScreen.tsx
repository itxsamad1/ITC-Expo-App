import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const trainings = [
  {
    id: 1,
    title: 'Truck Driving Training',
    description: 'Comprehensive training program for heavy vehicle driving including safety protocols and road regulations.',
    duration: '4 weeks',
    location: 'Karachi, Pakistan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARS5p-nEWIT7UDrlahLTwQeKxs6iY0V-5VjlOuxVxLyA_c7oozZgaXdVcFk3VoQZaOYW1yvmLGsczfEdd-GzZEgCYYizcidiy5jtIex1-60E0RBlRMliNMXdAeQCts2ItRDJBrpmyf0Knn_VFkge46KUumPScorvFlseIkeR9A6TkrUdDWB_wUSqCyjPj7kkELpw6JeCGxegpyFLh0d96QUxhKDckNEHtr3OAAV6ZTL24L9fglAv5LAZ6N_KT8-u3cwhDVEUktFVQ',
  },
  {
    id: 2,
    title: 'Car Driving Training',
    description: 'Professional car driving course covering defensive driving, traffic rules, and vehicle maintenance basics.',
    duration: '3 weeks',
    location: 'Lahore, Pakistan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2rSSIG2nq8wGPGSQ63U0Am2hb2YEj50LOs6J2W1qZ5-lMi5NoJEbKZoQswb5bk9lp545Qc8HSCsIlh7Zxtg6-n7tlkXWKn1aAbKnVYxcYErYg2uar0heQRLrNBzmTimLb9pKrg2tD32IyPcUnr-iLGBK86Wlq5NM1kUs1lzEbZ-LoHqmtDP675ibGKcJmXGl9RCrCQan8mwNFvxb1Hk959h85cTe3yltMvw_zbgKjcftTKIXb_AyV0cXv5guuD68r8wqe2KSqWlw',
  },
  {
    id: 3,
    title: 'Security Guard Training',
    description: 'Intensive security training program including surveillance techniques, emergency response, and legal protocols.',
    duration: '5 weeks',
    location: 'Islamabad, Pakistan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2U0AyGeX4U7IG-PzHByZ2YVbFP2oNb58VJ-z-5Co9Wb2RdxDay-h6TOutJFceIezRgGNc6RK7cnHNHDB9GgC0g6MhjlGvFL4xl_fR4r_QJLy0UT8SQS7Nz9gH_IgCx8Ho_rgIkNIdABGTD3Tf8npXZoRtpe0opnKr6UZ9gX2dQ4ht9mtqmWB7W1kTnFEhXYha1XUQmNjamuuWGUFTOyRiBLJtZ84euMFlZ0GsKazIeJU_koDaGEBhIZFwZaSGo-lhBxCx-qiB5Bc',
  },
];

export const TrainingScreen: React.FC = () => {
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
          }}
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold flex-1 text-center ${isDark ? 'text-white' : 'text-header-text'}`}>
          {t('training')}
        </Text>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
          }}
        >
          <Ionicons name="search-outline" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-header-text'}`}>
            {t('training_programs')}
          </Text>

          <View style={{ gap: 16 }}>
            {trainings.map((training) => (
              <View
                key={training.id}
                className={`rounded-2xl overflow-hidden ${
                  isDark ? 'bg-[#0A2F47]' : 'bg-white'
                }`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Image source={{ uri: training.image }} style={{ width: '100%', height: 192 }} />
                <View className="p-5">
                  <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-header-text'}`}>
                    {training.title}
                  </Text>
                  <Text className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {training.description}
                  </Text>
                  <View style={{ gap: 8, marginBottom: 16 }}>
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={18} color={isDark ? '#9CA3AF' : '#4B5563'} style={{ marginRight: 6 }} />
                      <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {training.duration}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="location-outline" size={18} color={isDark ? '#9CA3AF' : '#4B5563'} style={{ marginRight: 6 }} />
                      <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {training.location}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="rounded-xl h-11 items-center justify-center bg-primary"
                    activeOpacity={0.9}
                  >
                    <Text className="text-white text-sm font-bold">{t('register')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

