import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

// Resources will be translated in the component
const resources = [
  { id: 1, titleKey: 'work_visa', icon: 'document-text-outline' },
  { id: 2, titleKey: 'labour_rights', icon: 'scale-outline' },
  { id: 3, titleKey: 'language_courses', icon: 'globe-outline' },
  { id: 4, titleKey: 'networking_events', icon: 'people-outline' },
  { id: 5, titleKey: 'cultural_integration', icon: 'earth-outline' },
];

export const ResourcesScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<number | null>(null);
  const [visaForm, setVisaForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    passportNumber: '',
    destination: '',
  });
  const [labourRightsForm, setLabourRightsForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    question: '',
  });
  const [languageForm, setLanguageForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredLanguage: '',
    currentLevel: '',
  });
  const [networkingForm, setNetworkingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    interests: '',
  });
  const [culturalForm, setCulturalForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    destinationCountry: '',
    questions: '',
  });

  const handleResourcePress = (resourceId: number) => {
    setSelectedResource(resourceId);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!selectedResource) return;

    let isValid = false;
    let successMessage = '';

    switch (selectedResource) {
      case 1: // Work Visa
        isValid = !!(visaForm.fullName && visaForm.email && visaForm.phone && visaForm.passportNumber && visaForm.destination);
        successMessage = 'Your work visa application has been submitted successfully! Our team will contact you within 24–48 hours.';
        break;
      case 2: // Labour Rights
        isValid = !!(labourRightsForm.fullName && labourRightsForm.email && labourRightsForm.phone && labourRightsForm.question);
        successMessage = 'Your labour rights inquiry has been submitted! Our legal team will contact you within 24–48 hours.';
        break;
      case 3: // Language Courses
        isValid = !!(languageForm.fullName && languageForm.email && languageForm.phone && languageForm.preferredLanguage && languageForm.currentLevel);
        successMessage = 'Your language course registration has been submitted! We will contact you with course details within 24–48 hours.';
        break;
      case 4: // Networking Events
        isValid = !!(networkingForm.fullName && networkingForm.email && networkingForm.phone && networkingForm.profession);
        successMessage = 'Your networking event registration has been submitted! We will send you event details via email.';
        break;
      case 5: // Cultural Integration
        isValid = !!(culturalForm.fullName && culturalForm.email && culturalForm.phone && culturalForm.destinationCountry);
        successMessage = 'Your cultural integration inquiry has been submitted! Our team will provide guidance within 24–48 hours.';
        break;
    }

    if (!isValid) {
      Alert.alert(t('error'), 'Please fill all required fields');
      return;
    }

    Alert.alert(
      t('success'),
      successMessage,
      [
        {
          text: t('ok'),
          onPress: () => {
            setShowModal(false);
            setSelectedResource(null);
            // Reset forms
            setVisaForm({ fullName: '', email: '', phone: '', passportNumber: '', destination: '' });
            setLabourRightsForm({ fullName: '', email: '', phone: '', question: '' });
            setLanguageForm({ fullName: '', email: '', phone: '', preferredLanguage: '', currentLevel: '' });
            setNetworkingForm({ fullName: '', email: '', phone: '', profession: '', interests: '' });
            setCulturalForm({ fullName: '', email: '', phone: '', destinationCountry: '', questions: '' });
            router.push('/application-status');
          },
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`} style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
          backgroundColor: isDark ? '#052639' : '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
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
          {t('resources_guidance')}
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

      {/* Resources List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              onPress={() => handleResourcePress(resource.id)}
              className={`flex-row items-center p-5 rounded-2xl ${
                isDark ? 'bg-[#0A2F47]' : 'bg-white'
              }`}
              activeOpacity={0.8}
              style={{
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View
                className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                style={{
                  backgroundColor: isDark ? 'rgba(0,198,161,0.2)' : 'rgba(0,198,161,0.1)',
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(0,198,161,0.3)' : 'rgba(0,198,161,0.2)',
                }}
              >
                <Ionicons name={resource.icon as any} size={24} color="#00C6A1" />
              </View>
              <Text className={`flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                {t(resource.titleKey)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#9CA3AF'} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Resource Application Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
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
                  {selectedResource ? t(resources.find((r) => r.id === selectedResource)?.titleKey || '') : ''} - {t('apply')}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 14,
                    color: isDark ? '#9CA3AF' : '#6B7280',
                  }}
                >
                  {selectedResource === 1 && 'Fill in your details to apply for work visa assistance'}
                  {selectedResource === 2 && 'Submit your labour rights inquiry'}
                  {selectedResource === 3 && 'Register for language courses'}
                  {selectedResource === 4 && 'Register for networking events'}
                  {selectedResource === 5 && 'Get cultural integration guidance'}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={28} color={isDark ? '#fff' : '#111827'} />
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 24 }}
            >
              {/* Work Visa Form */}
              {selectedResource === 1 && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('full_name')} *
                    </Text>
                    <TextInput
                      value={visaForm.fullName}
                      onChangeText={(fullName) => setVisaForm({ ...visaForm, fullName })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('email')} *
                    </Text>
                    <TextInput
                      value={visaForm.email}
                      onChangeText={(email) => setVisaForm({ ...visaForm, email })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('phone_number')} *
                    </Text>
                    <TextInput
                      value={visaForm.phone}
                      onChangeText={(phone) => setVisaForm({ ...visaForm, phone })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('passport_number')} *
                    </Text>
                    <TextInput
                      value={visaForm.passportNumber}
                      onChangeText={(passportNumber) => setVisaForm({ ...visaForm, passportNumber })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Destination Country *
                    </Text>
                    <TextInput
                      value={visaForm.destination}
                      onChangeText={(destination) => setVisaForm({ ...visaForm, destination })}
                      placeholder="e.g., Czech Republic, UAE, Saudi Arabia"
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
                </>
              )}

              {/* Labour Rights Form */}
              {selectedResource === 2 && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('full_name')} *
                    </Text>
                    <TextInput
                      value={labourRightsForm.fullName}
                      onChangeText={(fullName) => setLabourRightsForm({ ...labourRightsForm, fullName })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('email')} *
                    </Text>
                    <TextInput
                      value={labourRightsForm.email}
                      onChangeText={(email) => setLabourRightsForm({ ...labourRightsForm, email })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('phone_number')} *
                    </Text>
                    <TextInput
                      value={labourRightsForm.phone}
                      onChangeText={(phone) => setLabourRightsForm({ ...labourRightsForm, phone })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Your Question/Concern *
                    </Text>
                    <TextInput
                      value={labourRightsForm.question}
                      onChangeText={(question) => setLabourRightsForm({ ...labourRightsForm, question })}
                      placeholder="Describe your labour rights question or concern"
                      placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                      multiline
                      numberOfLines={4}
                      style={{
                        backgroundColor: isDark ? '#052639' : '#F3F4F6',
                        padding: 14,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                        color: isDark ? '#fff' : '#000',
                        minHeight: 100,
                        textAlignVertical: 'top',
                      }}
                    />
                  </View>
                </>
              )}

              {/* Language Courses Form */}
              {selectedResource === 3 && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('full_name')} *
                    </Text>
                    <TextInput
                      value={languageForm.fullName}
                      onChangeText={(fullName) => setLanguageForm({ ...languageForm, fullName })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('email')} *
                    </Text>
                    <TextInput
                      value={languageForm.email}
                      onChangeText={(email) => setLanguageForm({ ...languageForm, email })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('phone_number')} *
                    </Text>
                    <TextInput
                      value={languageForm.phone}
                      onChangeText={(phone) => setLanguageForm({ ...languageForm, phone })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Preferred Language *
                    </Text>
                    <TextInput
                      value={languageForm.preferredLanguage}
                      onChangeText={(preferredLanguage) => setLanguageForm({ ...languageForm, preferredLanguage })}
                      placeholder="e.g., English, Czech, Arabic"
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Current Level *
                    </Text>
                    <TextInput
                      value={languageForm.currentLevel}
                      onChangeText={(currentLevel) => setLanguageForm({ ...languageForm, currentLevel })}
                      placeholder="e.g., Beginner, Intermediate, Advanced"
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
                </>
              )}

              {/* Networking Events Form */}
              {selectedResource === 4 && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('full_name')} *
                    </Text>
                    <TextInput
                      value={networkingForm.fullName}
                      onChangeText={(fullName) => setNetworkingForm({ ...networkingForm, fullName })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('email')} *
                    </Text>
                    <TextInput
                      value={networkingForm.email}
                      onChangeText={(email) => setNetworkingForm({ ...networkingForm, email })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('phone_number')} *
                    </Text>
                    <TextInput
                      value={networkingForm.phone}
                      onChangeText={(phone) => setNetworkingForm({ ...networkingForm, phone })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Profession *
                    </Text>
                    <TextInput
                      value={networkingForm.profession}
                      onChangeText={(profession) => setNetworkingForm({ ...networkingForm, profession })}
                      placeholder="e.g., Security Guard, Driver, Supervisor"
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Interests ({t('optional')})
                    </Text>
                    <TextInput
                      value={networkingForm.interests}
                      onChangeText={(interests) => setNetworkingForm({ ...networkingForm, interests })}
                      placeholder="What topics interest you?"
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
                </>
              )}

              {/* Cultural Integration Form */}
              {selectedResource === 5 && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('full_name')} *
                    </Text>
                    <TextInput
                      value={culturalForm.fullName}
                      onChangeText={(fullName) => setCulturalForm({ ...culturalForm, fullName })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('email')} *
                    </Text>
                    <TextInput
                      value={culturalForm.email}
                      onChangeText={(email) => setCulturalForm({ ...culturalForm, email })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      {t('phone_number')} *
                    </Text>
                    <TextInput
                      value={culturalForm.phone}
                      onChangeText={(phone) => setCulturalForm({ ...culturalForm, phone })}
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Destination Country *
                    </Text>
                    <TextInput
                      value={culturalForm.destinationCountry}
                      onChangeText={(destinationCountry) => setCulturalForm({ ...culturalForm, destinationCountry })}
                      placeholder="e.g., Czech Republic, UAE, Saudi Arabia"
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

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6, color: isDark ? '#ccc' : '#333', fontWeight: '600' }}>
                      Questions ({t('optional')})
                    </Text>
                    <TextInput
                      value={culturalForm.questions}
                      onChangeText={(questions) => setCulturalForm({ ...culturalForm, questions })}
                      placeholder="Any specific questions about cultural integration?"
                      placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                      multiline
                      numberOfLines={4}
                      style={{
                        backgroundColor: isDark ? '#052639' : '#F3F4F6',
                        padding: 14,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB',
                        color: isDark ? '#fff' : '#000',
                        minHeight: 100,
                        textAlignVertical: 'top',
                      }}
                    />
                  </View>
                </>
              )}

              {/* SUBMIT */}
              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
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
