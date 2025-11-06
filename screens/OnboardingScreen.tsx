import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../src/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const onboardingData = [
  {
    title: 'Explore Careers',
    description: 'Discover job opportunities worldwide that match your skills and ambitions. Connect with top employers and find your dream job across international markets.',
    icon: 'briefcase-outline' as const,
    features: [
      'Global job opportunities',
      'Personalized job matching',
      'Direct employer connections',
      'Career growth resources'
    ],
  },
  {
    title: 'Get Visa Guidance',
    description: 'Access comprehensive resources for navigating visa and immigration processes with confidence. Get expert support for your international career journey.',
    icon: 'airplane-outline' as const,
    features: [
      'Visa application support',
      'Immigration documentation',
      'Legal guidance resources',
      'Country-specific information'
    ],
  },
  {
    title: 'Grow Internationally',
    description: 'Utilize language resources and professional development tools to thrive in your new environment. Build skills that matter globally.',
    icon: 'globe-outline' as const,
    features: [
      'Language learning tools',
      'Cultural integration guides',
      'Professional networking',
      'Skill development programs'
    ],
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-white'}`} style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
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
            {/* Icon Section */}
            <View style={{ marginBottom: 40, alignItems: 'center' }}>
              <LinearGradient
                colors={['#00C6A1', '#052639']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#00C6A1',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 12,
                }}
              >
                <Ionicons name={item.icon} size={56} color="#ffffff" />
              </LinearGradient>
            </View>

            {/* Content Section */}
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
                className={`text-base leading-6 max-w-md mx-auto text-center mb-8 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {item.description}
              </Text>

              {/* Features List */}
              <View style={{ maxWidth: 320, marginHorizontal: 'auto', gap: 12 }}>
                {item.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Ionicons name="checkmark" size={16} color="#00C6A1" />
                    </View>
                    <Text
                      className={`text-sm flex-1 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
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
