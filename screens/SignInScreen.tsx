import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface SignInScreenProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onSignUp }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

  // Debug component lifecycle
  useEffect(() => {
    console.log('✅ SignInScreen MOUNTED');
    return () => {
      console.log('❌ SignInScreen UNMOUNTED');
    };
  }, []);

  // Debug theme changes
  useEffect(() => {
    console.log('Theme changed to:', theme);
  }, [theme]);

  // Handlers with debugging
  const handleEmailChange = (text: string) => {
    console.log('Email changed:', text);
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    console.log('Password changed:', text);
    setPassword(text);
  };

  const handleEmailFocus = () => {
    console.log('Email focused');
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    console.log('Email blurred');
    setEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    console.log('Password focused');
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    console.log('Password blurred');
    setPasswordFocused(false);
  };

  const handleSignIn = () => {
    console.log('=== SIGN IN PRESSED ===');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    console.log('Calling onSignIn callback');
    onSignIn(); // Calling onSignIn directly (no validation for testing)
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: isDark ? '#052639' : '#FFFFFF',
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            Welcome Back
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 32,
              color: isDark ? '#9CA3AF' : '#4B5563',
            }}
          >
            Sign in to continue your journey
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
                borderColor: emailFocused
                  ? '#00C6A1'
                  : isDark
                  ? '#374151'
                  : '#E5E7EB',
                backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                shadowColor: emailFocused ? '#00C6A1' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: emailFocused ? 0.1 : 0,
                shadowRadius: 4,
                elevation: emailFocused ? 2 : 0,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
                placeholder="Enter your email"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={email}
                onChangeText={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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
                borderColor: passwordFocused
                  ? '#00C6A1'
                  : isDark
                  ? '#374151'
                  : '#E5E7EB',
                backgroundColor: isDark ? '#0A2E44' : '#FFFFFF',
                shadowColor: passwordFocused ? '#00C6A1' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: passwordFocused ? 0.1 : 0,
                shadowRadius: 4,
                elevation: passwordFocused ? 2 : 0,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
                placeholder="Enter your password"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={password}
                onChangeText={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginLeft: 12, padding: 8 }}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 24 }}>
            <Text style={{ color: '#00C6A1', fontSize: 14, fontWeight: '600' }}>
              Forgot password?
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
                Sign In
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
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTbQGBhG_e0EvuFZpwY5sQ31I8wE6xuv0jTO0smxm3g3K09UxvDACobf-AZdBh0MCz6R8KFvw1-bw6r0W_FSbIA0fWAEA9Q2S30AvlYlBkVsa7tFupRpRjGpkH5EgVBUJdZJqUFk457C88k8nqmVkp1Jc0p5Q8tENIy_kvQAJgUmekMyZlHlseXPbP6QrcBeJ_28eO2VW1hG5oHOtLyJK6bQ3pgZx-JRt4aE10CHhX_4BCZZh9t624fvHcjiPCouYVdhmFwLAXYys',
                }}
                style={{ width: 24, height: 24, marginRight: 12 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
              >
                Sign in with Google
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
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh3A59DSNin3VaNZDjdrtstxO_zV8W-NY9uyU3jM73OouZAo-mljKz7KWe2LPNjXhWx7MjYlQZHYrOzTd0y2HYEoxNyN13ypEDinIcr6s786j-COd3EuyK0LxSB6-U9AKA0ElbOFkeisNk40s20sN8ONIwUaZ5ah6oNCuUjmVT8wySbHwVRBKCFkLs8jTgN1QPoeZn3EXtiKhvHhV-7wSWPe7Cjh0DouchL5CAuucmRSO6Dz2YvAhPmSUl5k3n_8j8OHYLlU_fIqk',
                }}
                style={{ width: 24, height: 24, marginRight: 12 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
              >
                Sign in with LinkedIn
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <Text style={{ fontSize: 14, color: isDark ? '#9CA3AF' : '#4B5563' }}>
              Don't have an account?{' '}
              <Text style={{ fontWeight: '600', color: '#00C6A1' }} onPress={onSignUp}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};