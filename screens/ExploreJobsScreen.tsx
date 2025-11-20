import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { jobs } from '../src/data/jobsData';
import type { Job } from '../src/data/jobsData';

export const ExploreJobsScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    cnic: '',
    passport: '',
    phone: '',
    email: '',
  });

  const tabHeight = useBottomTabBarHeight();
  const dynamicHeight = tabHeight * 0.6;

  const jobCategories = [
    { key: 'All', label: t('all') },
    { key: 'Driver', label: t('driver') },
    { key: 'Security Guard', label: t('security_guard') },
    { key: 'Security Officer', label: t('security_officer') },
    { key: 'Armed Security Officer', label: t('armed_security_officer') },
    { key: 'Security Supervisor/Manager', label: t('security_supervisor') },
  ];

  const filteredJobs =
    selectedCategory === 'All'
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  const handleApply = (job: Job) => {
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
      `You have successfully applied for ${selectedJob?.title} at ${selectedJob?.company}. Our team will contact you within 24–48 hours!`,
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
    <View
      className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
      style={{ paddingTop: insets.top }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
          backgroundColor: isDark ? '#052639' : '#FFFFFF',
          elevation: 2,
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

        <Text
          className={`text-xl font-bold flex-1 text-center ${
            isDark ? 'text-white' : 'text-header-text'
          }`}
        >
          {t('explore_jobs')}
        </Text>

        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
          }}
        >
          <Ionicons name="search-outline" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
      </View>

      {/* CATEGORY FILTER */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: isDark ? '#052639' : '#FFFFFF', maxHeight: 60 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12, alignItems: 'center' }}
      >
        {jobCategories.map((c) => (
          <TouchableOpacity
            key={c.key}
            onPress={() => setSelectedCategory(c.key)}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: selectedCategory === c.key ? '#00C6A1' : isDark ? '#0F3E5E' : '#F3F4F6',
              marginRight: 10,
              height: dynamicHeight * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor:
                selectedCategory === c.key
                  ? '#00C6A1'
                  : isDark
                  ? 'rgba(255,255,255,0.15)'
                  : '#E5E7EB',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: selectedCategory === c.key ? '#FFFFFF' : isDark ? '#D1D5DB' : '#374151',
              }}
            >
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* JOB LIST */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 16 }}>
          {filteredJobs.map((job) => (
            <View
              key={job.id}
              style={{
                backgroundColor: isDark ? '#0A2F47' : '#FFFFFF',
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                borderRadius: 16,
                padding: 20,
                elevation: 4,
              }}
            >
              <TouchableOpacity onPress={() => router.push(`/job-details/${job.id}`)}>
                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                  <Image
                    source={{ uri: job.logo }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#D1D5DB',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
                    }}
                  />
                  <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6, color: isDark ? '#fff' : '#052639' }}>
                      {job.title}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Image source={{ uri: job.flag }} style={{ width: 20, height: 20, borderRadius: 9999, marginRight: 8 }} />
                      <Text style={{ fontSize: 14, color: isDark ? '#9CA3AF' : '#6B7280' }}>
                        {job.company} • {job.location}
                      </Text>
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00C6A1' }}>
                      {job.salary.min}-{job.salary.max} {job.salary.currency}/{job.salary.period}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleApply(job)}
                style={{
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#00C6A1',
                  borderRadius: 12,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>{t('apply')}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ------------------------------------------------------------- */}
      {/* FIXED JOB APPLICATION MODAL                                  */}
      {/* ------------------------------------------------------------- */}

      <Modal
        visible={showApplicationModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowApplicationModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          {/* MODAL CONTENT */}
          <View
            style={{
              maxHeight: '90%',
              backgroundColor: isDark ? '#0A2F47' : '#FFFFFF',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingBottom: insets.bottom + 10,
            }}
          >
            {/* HEADER */}
            <View
              style={{
                padding: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: isDark ? '#fff' : '#052639',
                  }}
                >
                  {t('apply')} - {selectedJob?.title}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 14,
                    color: isDark ? '#9CA3AF' : '#6B7280',
                  }}
                >
                  {selectedJob?.company}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setShowApplicationModal(false)}>
                <Ionicons name="close" size={28} color={isDark ? '#fff' : '#111827'} />
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 24 }}
            >
              <Text style={{ fontSize: 15, marginBottom: 16, color: isDark ? '#ccc' : '#555' }}>
                Please provide your details to apply for this position.
              </Text>

              {/* FULL NAME */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                  {t('full_name')} *
                </Text>
                <TextInput
                  value={applicationForm.fullName}
                  onChangeText={(fullName) => setApplicationForm({ ...applicationForm, fullName })}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  style={{
                    backgroundColor: isDark ? '#052639' : '#F3F4F6',
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
              </View>

              {/* CNIC */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                  {t('cnic')} *
                </Text>
                <TextInput
                  value={applicationForm.cnic}
                  onChangeText={(cnic) => setApplicationForm({ ...applicationForm, cnic })}
                  placeholder="12345-1234567-1"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: isDark ? '#052639' : '#F3F4F6',
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
              </View>

              {/* PASSPORT */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                  {t('passport_number')} ({t('optional')})
                </Text>
                <TextInput
                  value={applicationForm.passport}
                  onChangeText={(passport) => setApplicationForm({ ...applicationForm, passport })}
                  placeholder="Enter passport number"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  style={{
                    backgroundColor: isDark ? '#052639' : '#F3F4F6',
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
              </View>

              {/* PHONE */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                  {t('phone_number')} *
                </Text>
                <TextInput
                  value={applicationForm.phone}
                  onChangeText={(phone) => setApplicationForm({ ...applicationForm, phone })}
                  keyboardType="phone-pad"
                  placeholder="0300-1234567"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  style={{
                    backgroundColor: isDark ? '#052639' : '#F3F4F6',
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
              </View>

              {/* EMAIL */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                  {t('email')} *
                </Text>
                <TextInput
                  value={applicationForm.email}
                  onChangeText={(email) => setApplicationForm({ ...applicationForm, email })}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  style={{
                    backgroundColor: isDark ? '#052639' : '#F3F4F6',
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
              </View>

              {/* SUBMIT */}
              <TouchableOpacity onPress={handleApplicationSubmit} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#00C6A1', '#00B894']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 52,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                    {t('submit')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
