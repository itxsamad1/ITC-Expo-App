import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { jobs } from '../src/data/jobsData';
import type { Job } from '../src/data/jobsData';

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    cnic: '',
    passport: '',
    phone: '',
    email: '',
  });

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = () => {
    if (!applicationForm.fullName || !applicationForm.cnic || !applicationForm.phone || !applicationForm.email) {
      Alert.alert(t('error'), 'Please fill all required fields');
      return;
    }

    Alert.alert(
      t('success'),
      `You have successfully applied for ${selectedJob?.title} at ${selectedJob?.company}. Our team will contact you within 24-48 hours!`,
      [
        {
          text: t('ok'),
          onPress: () => {
            setShowApplicationModal(false);
            setApplicationForm({ fullName: '', cnic: '', passport: '', phone: '', email: '' });
            router.push('/application-status');
          },
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className={`px-6 pt-4 pb-3 ${isDark ? 'bg-background-dark' : 'bg-white'}`}>
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt8oNhB0PWzIpTHhAe14QR7wLdnPMDYipV4plQjUO7tXbiqniy-GiQ8ZQxYFUG-Rdt3HA0L08llpySbOupbxuvRi5Z0NPVQSO0kZl3tQehpXAAY4jVQk6ZrqZFHGCvFbgRVLnKAKKQ59oCt882N5MogCiKqb7OTsoTQ3jmhChCl2P8icATiJjfUeBnuKrXxo8h44dJZZ7U5WRXMHUCVgduonyxKkoENgSyhmjIxQgszImAKXIZcFiJpQ3m-ZsV9wvHcjJUY5okIKo',
                }}
                className="w-12 h-12 rounded-full mr-3"
                style={{ borderWidth: 2, borderColor: isDark ? '#00C6A1' : '#E5E7EB' }}
              />
              <View>
                <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-0.5`}>
                  {t('welcome_back')},
                </Text>
                <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {t('hi')} Ahmed
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/notifications')}
              className="w-10 h-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color={isDark ? '#fff' : '#111827'} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View
            className={`flex-row items-center rounded-2xl h-14 px-4 ${
              isDark ? 'bg-[#0A2E44]' : 'bg-gray-50'
            }`}
            style={{
              borderWidth: 1,
              borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Ionicons name="search-outline" size={20} color="#00C6A1" style={{ marginRight: 12 }} />
            <TextInput
              className={`flex-1 text-base ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              placeholder={t('search') + '...'}
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            />
          </View>

        </View>

        {/* Advertising Banner */}
        <View className="px-6 py-4">
          <LinearGradient
            colors={['#00C6A1', '#052639']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              padding: 24,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
              shadowColor: '#00C6A1',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-2">
                  {t('earn_monthly')}
                </Text>
                <Text className="text-white/90 text-base mb-4">
                  {t('earn_monthly_subtitle')}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/jobs')}
                  className="bg-white rounded-xl px-6 py-3 self-start"
                  activeOpacity={0.9}
                >
                  <Text className="text-primary font-bold text-base">
                    {t('apply_now_cta')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Ionicons name="trending-up" size={48} color="rgba(255,255,255,0.3)" />
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View className="px-6 py-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {[
              { title: t('visa_support'), icon: 'airplane-outline', route: '/resources' },
              { title: t('training'), icon: 'school-outline', route: '/training' },
              { title: t('eligibility_checker'), icon: 'checkmark-circle-outline', route: '/eligibility-checker' },
              { title: t('salary_calculator'), icon: 'calculator-outline', route: '/salary-calculator' },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(action.route as any)}
                className="mr-4"
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#00C6A1', '#052639']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    padding: 20,
                    width: 144,
                    height: 128,
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.2)',
                    shadowColor: '#00C6A1',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Ionicons name={action.icon as any} size={28} color="#fff" />
                  <Text className="text-white text-sm font-semibold leading-tight mt-3">
                    {action.title}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Jobs Section */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Recommended for You
              </Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Based on your profile (Driver)
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/jobs')}>
              <Text className="text-primary text-sm font-semibold">{t('see_all')}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 24 ,}}>
            <View className='flex-row py-6' style={{ height: 250,}}>
            {jobs
              .filter((job) => job.category === 'Driver')
              .slice(0, 3)
              .map((job) => (
                <View
                  key={job.id}
                  style={{
                    width: 290,
                    marginRight: 16,
                    // height: 250,
                    backgroundColor: isDark ? '#0A2F47' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(198, 45, 45, 0.15)' : '#E5E7EB',
                    borderRadius: 16,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => router.push(`/job-details/${job.id}`)}
                    activeOpacity={0.9}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
                      <Image
                        source={{ uri: job.logo }}
                        style={{ 
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          borderWidth: 1.5, 
                          borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#D1D5DB',
                          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
                        }}
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={{ 
                          fontSize: 16, 
                          fontWeight: 'bold', 
                          marginBottom: 4,
                          color: isDark ? '#FFFFFF' : '#052639',
                        }}>
                          {job.title}
                        </Text>
                        <Text style={{ 
                          fontSize: 12,
                          color: isDark ? '#9CA3AF' : '#6B7280',
                        }}>
                          {job.company}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                      <Ionicons name="location-outline" size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
                      <Text style={{ 
                        fontSize: 12,
                        marginLeft: 4,
                        color: isDark ? '#9CA3AF' : '#6B7280',
                      }}>
                        {job.location}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: 'bold',
                        color: '#00C6A1',
                      }}>
                        {job.salary.min}-{job.salary.max} {job.salary.currency}/{job.salary.period}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push('/(tabs)/jobs');
                    }}
                    style={{
                      backgroundColor: '#00C6A1',
                      borderRadius: 8,
                      height: 44,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 12,
                      minHeight: 44,
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ 
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                      {t('apply')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
              </View>
          </ScrollView>
        </View>

        {/* Upcoming Trainings Section */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {t('upcoming_trainings')}
            </Text>
            <TouchableOpacity onPress={() => router.push('/training')}>
              <Text className="text-primary text-sm font-semibold">{t('see_all')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Job Application Modal */}
      <Modal
        visible={showApplicationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowApplicationModal(false)}
      >
        <View 
          className="flex-1 justify-end" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <TouchableOpacity 
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowApplicationModal(false)}
          />
          <View
            className={`rounded-t-3xl ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
            style={{ maxHeight: '90%', paddingBottom: insets.bottom }}
          >
            <View className="flex-row items-center justify-between p-6 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
              <View>
                <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {t('apply')} - {selectedJob?.title}
                </Text>
                <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedJob?.company}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowApplicationModal(false)}>
                <Ionicons name="close" size={28} color={isDark ? '#fff' : '#111827'} />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
              <Text className={`text-base mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Please provide your details to apply for this position.
              </Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Text className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('full_name')} *
                  </Text>
                  <TextInput
                    value={applicationForm.fullName}
                    onChangeText={(text) => setApplicationForm({ ...applicationForm, fullName: text })}
                    className={`rounded-xl p-4 ${isDark ? 'bg-[#052639] text-white' : 'bg-gray-50 text-gray-900'}`}
                    placeholder="Enter your full name"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    style={{
                      borderWidth: 1,
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                      borderRadius: 12,
                    }}
                  />
                </View>

                <View>
                  <Text className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('cnic')} *
                  </Text>
                  <TextInput
                    value={applicationForm.cnic}
                    onChangeText={(text) => setApplicationForm({ ...applicationForm, cnic: text })}
                    className={`rounded-xl p-4 ${isDark ? 'bg-[#052639] text-white' : 'bg-gray-50 text-gray-900'}`}
                    placeholder="12345-1234567-1"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                      borderRadius: 12,
                    }}
                  />
                </View>

                <View>
                  <Text className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('passport_number')} ({t('optional')})
                  </Text>
                  <TextInput
                    value={applicationForm.passport}
                    onChangeText={(text) => setApplicationForm({ ...applicationForm, passport: text })}
                    className={`rounded-xl p-4 ${isDark ? 'bg-[#052639] text-white' : 'bg-gray-50 text-gray-900'}`}
                    placeholder="Enter passport number"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    style={{
                      borderWidth: 1,
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                      borderRadius: 12,
                    }}
                  />
                </View>

                <View>
                  <Text className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('phone_number')} *
                  </Text>
                  <TextInput
                    value={applicationForm.phone}
                    onChangeText={(text) => setApplicationForm({ ...applicationForm, phone: text })}
                    keyboardType="phone-pad"
                    className={`rounded-xl p-4 ${isDark ? 'bg-[#052639] text-white' : 'bg-gray-50 text-gray-900'}`}
                    placeholder="0300-1234567"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    style={{
                      borderWidth: 1,
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                      borderRadius: 12,
                    }}
                  />
                </View>

                <View>
                  <Text className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('email')} *
                  </Text>
                  <TextInput
                    value={applicationForm.email}
                    onChangeText={(text) => setApplicationForm({ ...applicationForm, email: text })}
                    keyboardType="email-address"
                    className={`rounded-xl p-4 ${isDark ? 'bg-[#052639] text-white' : 'bg-gray-50 text-gray-900'}`}
                    placeholder="Enter your email"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    style={{
                      borderWidth: 1,
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                      borderRadius: 12,
                    }}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleApplicationSubmit}
                  className="rounded-xl h-14 items-center justify-center mt-4"
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#00C6A1', '#00B894']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                  />
                  <Text className="text-white text-lg font-bold">{t('submit')}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
