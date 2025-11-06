import { useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { useCallback } from 'react';

const ONBOARDING_STORAGE_KEY = '@itc_app:onboarding_state';
const AUTH_STORAGE_KEY = '@itc_app:auth_state';

// Module-level variable to track if splash has been shown in this app session
let hasShownSplashInSession = false;

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadAppState = useCallback(async (skipSplash = false) => {
    try {
      const [onboarding, auth] = await Promise.all([
        AsyncStorage.getItem(ONBOARDING_STORAGE_KEY),
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
      ]);

      const hasOnboarding = onboarding === 'true';
      const isAuth = auth === 'true';

      setHasSeenOnboarding(hasOnboarding);
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      // Only navigate to tabs if authenticated
      // Otherwise, let the render logic show the appropriate screen
      if (hasOnboarding && isAuth) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error loading app state:', error);
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Show splash screen only on first app launch in this session
    // Skip splash on subsequent navigations (like after logout)
    let timer: NodeJS.Timeout;

    if (!hasShownSplashInSession) {
      // First time in this session - show splash for 5 seconds
      hasShownSplashInSession = true;
      timer = setTimeout(() => {
        loadAppState(true);
      }, 5000);
    } else {
      // Already shown splash in this session (e.g., after logout) - skip splash
      loadAppState(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [loadAppState]);

  // Reload app state when screen comes into focus (e.g., after logout)
  // This ensures logout properly resets the state without showing splash
  useFocusEffect(
    useCallback(() => {
      // Reload app state when screen comes into focus
      // This is important for logout to work properly
      if (!isLoading) {
        loadAppState(true);
      }
    }, [isLoading, loadAppState])
  );


  const handleSplashFinish = () => {
    // Splash screen will finish on its own after 5 seconds
    // This callback is kept for compatibility but timing is handled by useEffect
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
    return <AuthScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  return null; // Will redirect to tabs
}

