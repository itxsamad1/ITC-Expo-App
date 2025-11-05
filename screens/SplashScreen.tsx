import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../src/contexts/ThemeContext';
import Svg, { Path } from 'react-native-svg';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish, fadeAnim]);

  return (
    <View className={`flex-1 items-center justify-center ${isDark ? 'bg-app-navy' : 'bg-white'}`}>
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
          <LinearGradient
            colors={['#00C6A1', '#052639']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              shadowColor: '#00C6A1',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Svg width={64} height={64} viewBox="0 0 24 24">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 10.34 18 12 18V19.93H11ZM17.92 17.38C17.43 16.14 16.36 15.26 15 15H14V13C14 12.45 13.55 12 13 12H8V10H10C10.55 10 11 9.55 11 9V7H13V9C13 10.1 12.1 11 11 11H10V12H13C14.1 12 15 12.9 15 14V15C16.05 15 16.96 15.35 17.65 15.94C18.44 14.77 19 13.44 19 12C19 8.13 15.69 5 12 5C11.66 5 11.32 5.04 11 5.1V4.07C15.94 4.56 19.56 8.83 19.93 14H19.94C19.52 15.48 18.84 16.78 17.92 17.38Z"
                fill={isDark ? '#F7F8FA' : 'white'}
              />
            </Svg>
          </LinearGradient>
          <View className="items-center">
            <Text
              className={`text-2xl font-bold ${isDark ? 'text-app-light-grey' : 'text-header-text'}`}
              style={{
                letterSpacing: -0.5,
              }}
            >
              International Talent Connect
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
