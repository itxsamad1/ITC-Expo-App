import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const { setLanguage } = useLanguage();
  const isDark = theme === 'dark';
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // After fade animation completes, show language selection
      setShowLanguageSelection(true);
    });
  }, [fadeAnim]);

  const handleLanguageSelect = (lang: 'en' | 'ur') => {
    setLanguage(lang);
    setShowLanguageSelection(false);
    // Wait a moment then proceed
    setTimeout(() => {
      onFinish();
    }, 300);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <View
            style={{
              width: 160,
              height: 160,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Image
              source={require('../assets/icon.png')}
              style={{
                width: 160,
                height: 160,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </Animated.View>

      {/* Language Selection */}
      {showLanguageSelection && (
        <Animated.View
          style={{
            marginTop: 48,
            width: '100%',
            paddingHorizontal: 32,
            opacity: fadeAnim,
          }}
        >
          <Text
            className="text-lg font-semibold mb-4 text-center text-white"
            style={{ marginBottom: 24 }}
          >
            Select Language / زبان منتخب کریں
          </Text>
          <View style={{ gap: 16 }}>
            <TouchableOpacity
              onPress={() => handleLanguageSelect('en')}
              activeOpacity={0.8}
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
                <Text className="text-white text-lg font-bold">English</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLanguageSelect('ur')}
              activeOpacity={0.8}
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
                <Text className="text-white text-lg font-bold">اردو</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};
