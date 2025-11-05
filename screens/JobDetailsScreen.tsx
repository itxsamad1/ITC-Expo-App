import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const JobDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <View className={`flex-1 ${isDark ? 'bg-navy' : 'bg-white'}`}>
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXGD8O6pZg8iLTgl-OuDCDqX4WsyCRyiylrZPDXiBHa8w4ce10VWxODPiOI7xsfsHUGDMWel1m1DZL29gBqrOOw4c5XSs-416pVfPwZyYuAM7k-nQ1UzjonIaRe-GiaU2RQAU6lXzXABkk9Le0gp1efAoWeF7jvMhbQ3k4VN_2TVhOw77wnfEa5p3ecTTbBjXn_f2kEyoqY5pWYbUCIsXB_ErkRVTLfVu5YXZYvSowxrDm95_Cpg-YlhDVr7Awx4ShwqXTDptVnmE',
            }}
            className="w-16 h-16 rounded-xl"
            style={{ borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}
          />
          <View className="flex-1 ml-4">
            <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
              Innovate Inc.
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              San Francisco, CA
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-primary text-sm font-semibold">View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Job Title */}
        <View className="px-6 mt-6">
          <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
            Senior Product Designer
          </Text>
          <Text className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            San Francisco, CA • Full-Time • $120k - $150k/year
          </Text>
        </View>

        {/* Tabs */}
        <View className="px-6 mb-6">
          <View
            className={`flex-row h-12 rounded-xl p-1 ${
              isDark ? 'bg-black/20' : 'bg-gray-100'
            }`}
          >
            {['Description', 'Requirements', 'About'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 items-center justify-center rounded-lg ${
                  activeTab === tab
                    ? isDark
                      ? 'bg-[#0B3047]'
                      : 'bg-white'
                    : ''
                }`}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeTab === tab
                      ? isDark
                        ? 'text-white'
                        : 'text-navy'
                      : isDark
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        <View className="px-6">
          <Text className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
            Job Description
          </Text>
          <Text className={`text-base leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We are looking for a passionate Senior Product Designer to join our dynamic team. You will
            be responsible for the entire product design lifecycle, from user research and wireframing
            to creating high-fidelity mockups and interactive prototypes. You'll collaborate closely
            with product managers, engineers, and other stakeholders to deliver intuitive and
            compelling user experiences for our global audience.
          </Text>

          <Text className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
            Responsibilities
          </Text>
          {[
            'Lead design projects across the entire product lifecycle.',
            'Set the vision for the user experience and create a space for others to collaborate.',
            'Work with product managers to define requirements, not just translate them to design.',
            'Create wireframes, storyboards, user flows, and site maps.',
            'Conduct user research and evaluate user feedback.',
          ].map((item, index) => (
            <View key={index} className="flex-row mb-2">
              <Text className={`text-base mr-2 ${isDark ? 'text-primary' : 'text-primary'}`}>•</Text>
              <Text className={`flex-1 text-base leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {item}
              </Text>
            </View>
          ))}

          {/* Visa & Language Card */}
          <View
            className={`mt-6 p-5 rounded-2xl ${
              isDark ? 'bg-[#0B3047] border border-white/10' : 'bg-teal-50 border border-teal-100'
            }`}
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="language-outline" size={20} color={isDark ? '#00C6A1' : '#00C6A1'} style={{ marginRight: 8 }} />
              <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Visa & Language
              </Text>
            </View>
            <Text className={`text-base leading-6 mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Text className="font-semibold">Visa Sponsorship:</Text> Available for qualified candidates.
            </Text>
            <Text className={`text-base leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Text className="font-semibold">Language Proficiency:</Text> Professional working proficiency
              in English required.
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
          <Text className="text-white text-lg font-bold">Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
