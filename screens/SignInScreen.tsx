import React, { useState, useCallback, useRef, useMemo } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

interface SignInScreenProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onSignUp }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  
  // Use refs to prevent re-renders from causing focus loss
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // Use useCallback to prevent unnecessary re-renders
  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleEmailFocus = useCallback(() => {
    setEmailFocused(true);
  }, []);

  const handleEmailBlur = useCallback(() => {
    setEmailFocused(false);
  }, []);

  const handlePasswordFocus = useCallback(() => {
    setPasswordFocused(true);
  }, []);

  const handlePasswordBlur = useCallback(() => {
    setPasswordFocused(false);
  }, []);

  const handleSignIn = useCallback(() => {
    // Validate credentials
    const validEmail = 'user@gmail.com';
    const validPassword = '12345678';
    
    if (email.trim() === validEmail && password === validPassword) {
      onSignIn();
    } else {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  }, [email, password, onSignIn]);

  // Memoize input container styles to prevent re-renders
  const emailContainerStyle = useMemo(() => ({
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: emailFocused ? '#00C6A1' : (isDark ? '#374151' : '#E5E7EB'),
    backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
    shadowColor: emailFocused ? '#00C6A1' : 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: emailFocused ? 0.1 : 0,
    shadowRadius: 4,
    elevation: emailFocused ? 2 : 0,
  }), [emailFocused, isDark]);

  const passwordContainerStyle = useMemo(() => ({
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: passwordFocused ? '#00C6A1' : (isDark ? '#374151' : '#E5E7EB'),
    backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
    shadowColor: passwordFocused ? '#00C6A1' : 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: passwordFocused ? 0.1 : 0,
    shadowRadius: 4,
    elevation: passwordFocused ? 2 : 0,
  }), [passwordFocused, isDark]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? '#052639' : '#FFFFFF',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          nestedScrollEnabled={true}
        >
        <View style={{ width: '100%', maxWidth: 448, marginHorizontal: 'auto', paddingHorizontal: 24, paddingVertical: 32 }}>
          {/* Logo */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <LinearGradient
              colors={['#00C6A1', '#052639']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#00C6A1',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="globe-outline" size={28} color="#ffffff" />
            </LinearGradient>
          </View>

          {/* Welcome Text */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              lineHeight: 38,
              textAlign: 'center',
              marginBottom: 8,
              letterSpacing: -0.5,
              color: isDark ? '#FFFFFF' : '#052639',
            }}
          >
            {t('welcome_back')}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 32,
              color: isDark ? '#9CA3AF' : '#4B5563',
            }}
          >
            {t('sign_in')} {t('continue') || 'to continue your journey'}
          </Text>

          {/* Email Input */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 10,
                color: isDark ? '#D1D5DB' : '#374151',
              }}
            >
              {t('email')}
            </Text>
            <View style={emailContainerStyle}>
              <TextInput
                ref={emailInputRef}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: isDark ? '#FFFFFF' : '#111827',
                  padding: 0,
                }}
                placeholder={t('email')}
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={email}
                onChangeText={handleEmailChange}
                // onFocus={handleEmailFocus}
                // onBlur={handleEmailBlur}
                // keyboardType="email-address"
                // autoCapitalize="none"
                // autoCorrect={false}
                // autoComplete="email"
                // returnKeyType="next"
                // blurOnSubmit={false}
                // editable={true}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 10,
                color: isDark ? '#D1D5DB' : '#374151',
              }}
            >
              {t('password')}
            </Text>
            <View style={passwordContainerStyle}>
              <TextInput
                ref={passwordInputRef}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: isDark ? '#FFFFFF' : '#111827',
                  padding: 0,
                }}
                placeholder={t('password')}
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={password}
                onChangeText={handlePasswordChange}
                // onFocus={handlePasswordFocus}
                // onBlur={handlePasswordBlur}
                secureTextEntry={!showPassword}
                // autoComplete="password"
                // returnKeyType="done"
                // editable={true}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)} 
                style={{ marginLeft: 12, padding: 8 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 24 }}>
            <Text style={{ color: '#00C6A1', fontSize: 14, fontWeight: '600' }}>
              {t('forgot_password')}
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            style={{ marginBottom: 24 }}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#00C6A1', '#00B894']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 9999,
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
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                {t('sign_in')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: isDark ? '#374151' : '#E5E7EB' }} />
            <Text style={{ paddingHorizontal: 16, fontSize: 14, color: isDark ? '#9CA3AF' : '#6B7280' }}>
              or continue with
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: isDark ? '#374151' : '#E5E7EB' }} />
          </View>

          {/* Social Login Buttons */}
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 56,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: isDark ? '#374151' : '#E5E7EB',
                backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
              activeOpacity={0.7}
            >
              <View style={{ width: 24, height: 24, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="google" size={24} color="#4285F4" />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
              >
                {t('sign_in_with_google')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 56,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: isDark ? '#374151' : '#E5E7EB',
                backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
              activeOpacity={0.7}
            >
              <View style={{ width: 24, height: 24, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="linkedin" size={24} color="#0077B5" />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
              >
                {t('sign_in_with_linkedin')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <Text style={{ fontSize: 14, color: isDark ? '#9CA3AF' : '#4B5563' }}>
              {t('dont_have_account')}{' '}
              <Text style={{ fontWeight: '600', color: '#00C6A1' }} onPress={onSignUp}>
                {t('sign_up')}
              </Text>
            </Text>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};