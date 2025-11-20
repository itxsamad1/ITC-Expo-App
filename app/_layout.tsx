import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="job-details/[id]" />
            <Stack.Screen name="training" />
            <Stack.Screen name="resources" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="eligibility-checker" />
            <Stack.Screen name="application-status" />
            <Stack.Screen name="document-upload" />
            <Stack.Screen name="visa-timeline" />
            <Stack.Screen name="salary-calculator" />
            <Stack.Screen name="cost-breakdown" />
            <Stack.Screen name="faqs" />
            <Stack.Screen name="support" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

