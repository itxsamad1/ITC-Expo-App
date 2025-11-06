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
import { LinearGradient } from 'expo-linear-gradient';

interface SignUpScreenProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onSignIn }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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

    // Success - proceed with sign up
    onSignUp();
  }, [name, email, password, confirmPassword, onSignUp]);

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
              Create Account
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 32,
                color: isDark ? '#9CA3AF' : '#4B5563',
              }}
            >
              Sign up to start your journey
            </Text>

            {/* Name Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  marginBottom: 10,
                  color: isDark ? '#D1D5DB' : '#374151',
                }}
              >
                Full Name
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  height: 56,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: isDark ? '#374151' : '#E5E7EB',
                  backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                }}
              >
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
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

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
                Email Address
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  height: 56,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: isDark ? '#374151' : '#E5E7EB',
                  backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: isDark ? '#FFFFFF' : '#111827',
                    padding: 0,
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  marginBottom: 10,
                  color: isDark ? '#D1D5DB' : '#374151',
                }}
              >
                Password
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  height: 56,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: isDark ? '#374151' : '#E5E7EB',
                  backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                }}
              >
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

            {/* Confirm Password Input */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  marginBottom: 10,
                  color: isDark ? '#D1D5DB' : '#374151',
                }}
              >
                Confirm Password
              </Text>
              <View
                style={{
                  borderRadius: 12,
                  height: 56,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: isDark ? '#374151' : '#E5E7EB',
                  backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                }}
              >
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

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
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
                  Sign Up
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
                  Sign up with Google
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
                  Sign up with LinkedIn
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View style={{ alignItems: 'center', marginTop: 32 }}>
              <Text style={{ fontSize: 14, color: isDark ? '#9CA3AF' : '#4B5563' }}>
                Already have an account?{' '}
                <Text style={{ fontWeight: '600', color: '#00C6A1' }} onPress={onSignIn}>
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

