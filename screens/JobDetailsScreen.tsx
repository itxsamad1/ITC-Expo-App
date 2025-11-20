import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { jobs } from '../src/data/jobsData';

export const JobDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Description');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    cnic: '',
    passport: '',
    phone: '',
    email: '',
  });

  const job = jobs.find((j) => j.id === parseInt(id || '0'));

  if (!job) {
    return (
      <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
        <View className="flex-1 items-center justify-center">
          <Text className={`text-lg ${isDark ? 'text-white' : 'text-navy'}`}>Job not found</Text>
        </View>
      </View>
    );
  }

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = () => {
    if (!applicationForm.fullName || !applicationForm.cnic || !applicationForm.phone || !applicationForm.email) {
      Alert.alert(t('error'), 'Please fill all required fields');
      return;
    }

    Alert.alert(
      t('success'),
      `You have successfully applied for ${job.title} at ${job.company}. Our team will contact you within 24-48 hours!`,
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
    <View className={`flex-1 ${isDark ? 'bg-navy' : 'bg-white'}`} style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
          backgroundColor: isDark ? 'rgba(5, 38, 57, 0.95)' : '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
          }}
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
        <Text className={`text-lg font-bold flex-1 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
          Job Details
        </Text>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
          }}
        >
          <Ionicons name="bookmark-outline" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingBottom: 128 }} showsVerticalScrollIndicator={false}>
        {/* Company Info */}
        <View
          className={`mx-6 mt-6 p-5 rounded-2xl flex-row items-center ${
            isDark ? 'bg-[#0A2F47]' : 'bg-gray-50'
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
          <Image
            source={{ uri: job.logo }}
            className="w-16 h-16 rounded-xl"
            style={{ borderWidth: 1.5, borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#D1D5DB' }}
          />
          <View className="flex-1 ml-4">
            <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
              {job.company}
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {job.location}
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-primary text-sm font-semibold">View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Job Title */}
        <View className="px-6 mt-6">
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
            {job.title}
          </Text>
          <Text className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {job.location} • {job.employmentType} • {job.salary.min}-{job.salary.max} {job.salary.currency}/{job.salary.period}
          </Text>
        </View>

        {/* Tabs */}
        <View className="px-6 mb-6">
          <View
            className={`flex-row h-12 rounded-xl p-1 ${
              isDark ? 'bg-black/20' : 'bg-gray-100'
            }`}
            style={{
              borderWidth: 1,
              borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
            }}
          >
            {[
              { key: 'Description', label: t('job_description') },
              { key: 'Requirements', label: t('requirements') },
              { key: 'About', label: t('company_info') }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 items-center justify-center rounded-lg ${
                  activeTab === tab.key
                    ? isDark
                      ? 'bg-[#0B3047]'
                      : 'bg-white'
                    : ''
                }`}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeTab === tab.key
                      ? isDark
                        ? 'text-white'
                        : 'text-navy'
                      : isDark
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        <View className="px-6">
          <Text className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
            {activeTab === 'Description' ? t('job_description') : activeTab === 'Requirements' ? t('requirements') : t('company_info')}
          </Text>
          {activeTab === 'Description' && (
            <>
              <Text className={`text-base leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {job.description}
              </Text>

              <Text className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                Responsibilities
              </Text>
              {job.responsibilities.map((item, index) => (
                <View key={index} className="flex-row mb-2">
                  <Text className={`text-base mr-2 ${isDark ? 'text-primary' : 'text-primary'}`}>•</Text>
                  <Text className={`flex-1 text-base leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item}
                  </Text>
                </View>
              ))}
            </>
          )}

          {activeTab === 'Requirements' && (
            <>
              <Text className={`text-base leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                To be considered for this position, you must meet the following requirements:
              </Text>
              {job.requirements.map((item, index) => (
                <View key={index} className="flex-row mb-2">
                  <Text className={`text-base mr-2 ${isDark ? 'text-primary' : 'text-primary'}`}>•</Text>
                  <Text className={`flex-1 text-base leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item}
                  </Text>
                </View>
              ))}
            </>
          )}

          {activeTab === 'About' && (
            <>
              <Text className={`text-base leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {job.company} is a leading company in the industry, committed to providing excellent services and opportunities for our employees.
              </Text>
              <Text className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                Benefits
              </Text>
              {job.benefits.map((item, index) => (
                <View key={index} className="flex-row mb-2">
                  <Text className={`text-base mr-2 ${isDark ? 'text-primary' : 'text-primary'}`}>•</Text>
                  <Text className={`flex-1 text-base leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item}
                  </Text>
                </View>
              ))}
            </>
          )}

          {/* Visa & Language Card */}
          <View
            className={`mt-6 p-5 rounded-2xl ${
              isDark ? 'bg-[#0B3047]' : 'bg-teal-50'
            }`}
            style={{
              borderWidth: 1.5,
              borderColor: isDark ? 'rgba(0,198,161,0.3)' : '#B2F5EA',
            }}
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="language-outline" size={20} color={isDark ? '#00C6A1' : '#00C6A1'} style={{ marginRight: 8 }} />
              <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Visa & Language
              </Text>
            </View>
            <Text className={`text-base leading-6 mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Text className="font-semibold">Visa Sponsorship:</Text> {job.visaSponsorship ? 'Available for qualified candidates' : 'Not available'}
            </Text>
            <Text className={`text-base leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Text className="font-semibold">Language Proficiency:</Text> {job.languageRequired} required.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Apply Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 24,
          borderTopWidth: 1,
          borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
          backgroundColor: isDark ? 'rgba(5, 38, 57, 0.95)' : 'rgba(255,255,255,0.95)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <TouchableOpacity
          onPress={handleApply}
          className="rounded-xl h-14 items-center justify-center"
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
            }}
          />
          <Text className="text-white text-lg font-bold">{t('apply_now')}</Text>
        </TouchableOpacity>
      </View>

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
                  {t('apply')} - {job.title}
                </Text>
                <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {job.company}
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
