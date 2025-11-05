import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const onboardingData = [
  {
    title: 'Explore Careers',
    description: 'Discover job opportunities worldwide that match your skills and ambitions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCU6ee20yxaVsrerNeH9_6SVR5j0XQuIUnolRfcG2VIU2wrqNA_KG3K9w0hHxuIpM1-h_tytzki99BRS77OTiLqwPtc1LLdg9vvGPW1jSc2AtDkmWMQg7a3iqrL0rUPtofD_VTFOHirb-8S1EYOUZM2oeRSGetPhjIrJ9mhl6C7NMt3CrOu1Pdljway3kEkJcqksYkFvH1ACzc0EeiKIKtVTmc5AwC8TYRXT9ehJ05Nj4N4VekoN-aTzF3HkXc8xBFFVPykObWK4',
  },
  {
    title: 'Get Visa Guidance',
    description: 'Access resources for navigating visa and immigration processes with confidence.',
    image: 'https://storage.googleapis.com/pai-images/ef1e469532584d4ab2cc923ed1aa5e40.png',
  },
  {
    title: 'Grow Internationally',
    description: 'Utilize language resources and professional development tools to thrive.',
    image: 'https://storage.googleapis.com/pai-images/93ef3d39578044709d21abed9f71c4c9.png',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-white'}`}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
        }}
        className="flex-1"
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48, minWidth: '100%' }}>
            <View style={{ width: '100%', maxWidth: 384, marginBottom: 32, aspectRatio: 1 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            </View>
            <View className="px-4 w-full">
              <Text
                className={`text-3xl font-bold leading-tight text-center mb-4 ${
                  isDark ? 'text-white' : 'text-header-text'
                }`}
                style={{ letterSpacing: -0.5 }}
              >
                {item.title}
              </Text>
              <Text
                className={`text-base leading-6 max-w-sm mx-auto text-center ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="px-6 pb-8 pt-4">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                borderRadius: 9999,
                width: index === currentIndex ? 32 : 8,
                backgroundColor: index === currentIndex ? '#00C6A1' : '#D1D5DB',
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={onGetStarted}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#00C6A1', '#00B894']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 12,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#00C6A1',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text className="text-white text-base font-bold">
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
