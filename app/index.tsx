import { useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { useCallback } from 'react';

const ONBOARDING_STORAGE_KEY = '@itc_app:onboarding_state';
const AUTH_STORAGE_KEY = '@itc_app:auth_state';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

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

      if (!hasOnboarding) {
        // Will show onboarding
        setIsLoading(false);
      } else if (!isAuth) {
        // Will show sign-in
        setIsLoading(false);
      } else {
        // Navigate to home
        setIsLoading(false);
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error loading app state:', error);
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Check if this is first load by checking if onboarding exists
    // If onboarding exists, skip splash and load immediately
    // If not, show splash for 5 seconds
    let timer: NodeJS.Timeout;

    const checkAndLoad = async () => {
      try {
        const onboarding = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
        if (onboarding === 'true') {
          // User has seen onboarding before, skip splash
          loadAppState(true);
        } else {
          // First time, show splash for 5 seconds
          timer = setTimeout(() => {
            loadAppState(true);
          }, 5000);
        }
      } catch (error) {
        // On error, show splash anyway
        timer = setTimeout(() => {
          loadAppState(true);
        }, 5000);
      }
    };

    checkAndLoad();

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
      // Only reload if we're not in initial loading state
      // This prevents conflicts with the splash screen timer
      if (!isLoading) {
        // Skip splash on focus reload (e.g., after logout)
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

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleShowSignIn = () => {
    setShowSignUp(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onGetStarted={handleOnboardingComplete} />;
  }

  if (!isAuthenticated) {
    if (showSignUp) {
      return <SignUpScreen onSignUp={handleSignUp} onSignIn={handleShowSignIn} />;
    }
    return <SignInScreen onSignIn={handleSignIn} onSignUp={handleShowSignUp} />;
  }

  return null; // Will redirect to tabs
}

