import React, { useState, useCallback } from 'react';
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

interface AuthScreenProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

type AuthMode = 'signin' | 'signup';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSignIn, onSignUp }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<AuthMode>('signin');
  
  // Form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  // Focus states
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [nameFocused, setNameFocused] = useState<boolean>(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState<boolean>(false);

  const handleSignIn = useCallback(() => {
    const validEmail = 'user@gmail.com';
    const validPassword = '12345678';
    
    if (email.trim() === validEmail && password === validPassword) {
      onSignIn();
    } else {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  }, [email, password, onSignIn]);

  const handleSignUp = useCallback(() => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    onSignUp();
  }, [name, email, password, confirmPassword, onSignUp]);

  // Input container styles
  const inputContainerStyle = useCallback((focused: boolean) => ({
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: focused ? '#00C6A1' : (isDark ? '#374151' : '#E5E7EB'),
    backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
    shadowColor: focused ? '#00C6A1' : 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: focused ? 0.1 : 0,
    shadowRadius: 4,
    elevation: focused ? 2 : 0,
  }), [isDark]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? '#052639' : '#F9FAFB',
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
        >
          <View style={{ width: '100%', maxWidth: 448, marginHorizontal: 'auto', paddingHorizontal: 24, paddingVertical: 32 }}>
            {/* Title */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 32,
                color: isDark ? '#FFFFFF' : '#052639',
                letterSpacing: -0.5,
              }}
            >
              International Talent Connect
            </Text>

            {/* Sign In / Sign Up Toggle */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                borderRadius: 12,
                padding: 4,
                marginBottom: 32,
                borderWidth: 1,
                borderColor: isDark ? '#374151' : '#E5E7EB',
              }}
            >
              <TouchableOpacity
                onPress={() => setMode('signin')}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: mode === 'signin' ? '#00C6A1' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: mode === 'signin' ? '#FFFFFF' : (isDark ? '#9CA3AF' : '#6B7280'),
                  }}
                >
                  {t('sign_in')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMode('signup')}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: mode === 'signup' ? '#00C6A1' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: mode === 'signup' ? '#FFFFFF' : (isDark ? '#9CA3AF' : '#6B7280'),
                  }}
                >
                  {t('sign_up')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Full Name Field (Sign Up only) */}
            {mode === 'signup' && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 10,
                    color: isDark ? '#D1D5DB' : '#374151',
                  }}
                >
                  {t('full_name')}
                </Text>
                <View style={inputContainerStyle(nameFocused)}>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: isDark ? '#FFFFFF' : '#111827',
                      padding: 0,
                    }}
                    placeholder="Enter your full name"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>
            )}

            {/* Email Field */}
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
              <View style={inputContainerStyle(emailFocused)}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: isDark ? '#FFFFFF' : '#111827',
                    padding: 0,
                  }}
                  placeholder="Enter your email address"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  value={email}
                  onChangeText={setEmail}
                //   onFocus={() => setEmailFocused(true)}
                //   onBlur={() => setEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={{ marginBottom: mode === 'signin' ? 16 : 20 }}>
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
              <View style={inputContainerStyle(passwordFocused)}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: isDark ? '#FFFFFF' : '#111827',
                    padding: 0,
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  value={password}
                  onChangeText={setPassword}
                //   onFocus={() => setPasswordFocused(true)}
                //   onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!showPassword}
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

            {/* Confirm Password Field (Sign Up only) */}
            {mode === 'signup' && (
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 10,
                    color: isDark ? '#D1D5DB' : '#374151',
                  }}
                >
                  {t('confirm_password')}
                </Text>
                <View style={inputContainerStyle(confirmPasswordFocused)}>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: isDark ? '#FFFFFF' : '#111827',
                      padding: 0,
                    }}
                    placeholder="Confirm your password"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                    style={{ marginLeft: 12, padding: 8 }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Forgot Password (Sign In only) */}
            {mode === 'signin' && (
              <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 24 }}>
                <Text style={{ color: '#00C6A1', fontSize: 14, fontWeight: '600' }}>
                  {t('forgot_password')}
                </Text>
              </TouchableOpacity>
            )}

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={mode === 'signin' ? handleSignIn : handleSignUp}
              style={{ marginBottom: 24 }}
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
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                  {mode === 'signin' ? t('sign_in') : t('create_account')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: isDark ? '#374151' : '#E5E7EB' }} />
              <Text style={{ paddingHorizontal: 16, fontSize: 14, color: isDark ? '#9CA3AF' : '#6B7280' }}>
                {t('or_continue_with')}
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
                  <MaterialCommunityIcons name="linkedin" size={24} color="#0077B5" />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: isDark ? '#FFFFFF' : '#111827',
                  }}
                >
                  {mode === 'signin' ? t('sign_in_with_linkedin') : t('sign_up_with_linkedin')}
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
                  <MaterialCommunityIcons name="google" size={24} color="#4285F4" />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: isDark ? '#FFFFFF' : '#111827',
                  }}
                >
                  {mode === 'signin' ? t('sign_in_with_google') : t('sign_up_with_google')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

