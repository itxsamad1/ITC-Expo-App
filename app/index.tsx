import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SignInScreen } from '../screens/SignInScreen';

const ONBOARDING_STORAGE_KEY = '@itc_app:onboarding_state';
const AUTH_STORAGE_KEY = '@itc_app:auth_state';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadAppState();
  }, []);

  const loadAppState = async () => {
    try {
      const [onboarding, auth] = await Promise.all([
        AsyncStorage.getItem(ONBOARDING_STORAGE_KEY),
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
      ]);

      const hasOnboarding = onboarding === 'true';
      const isAuth = auth === 'true';

      setHasSeenOnboarding(hasOnboarding);
      setIsAuthenticated(isAuth);

      if (!hasOnboarding) {
        // Will show onboarding
      } else if (!isAuth) {
        // Will show sign-in
      } else {
        // Navigate to home
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error loading app state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding state:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onGetStarted={handleOnboardingComplete} />;
  }

  if (!isAuthenticated) {
    return <SignInScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  return null; // Will redirect to tabs
}

