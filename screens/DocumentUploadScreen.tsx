import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useLanguage } from '../src/contexts/LanguageContext';
// import * as DocumentPicker from 'expo-document-picker';

interface Document {
  id: string;
  name: string;
  category: 'identity' | 'medical' | 'training' | 'visa';
  status: 'uploaded' | 'under_review' | 'accepted' | 'rejected';
  notes?: string;
}

export const DocumentUploadScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'passport_copy', category: 'identity', status: 'uploaded' },
    { id: '2', name: 'cnic', category: 'identity', status: 'under_review' },
    { id: '3', name: 'gamca_medical', category: 'medical', status: 'pending' },
    { id: '4', name: 'training_certificate', category: 'training', status: 'pending' },
    { id: '5', name: 'visa_slip', category: 'visa', status: 'pending' },
    { id: '6', name: 'pe_number', category: 'visa', status: 'pending' },
  ]);

  const getDocumentName = (key: string) => {
    const names: Record<string, string> = {
      passport_copy: t('passport_copy'),
      cnic: 'CNIC',
      gamca_medical: 'GAMCA Medical Report',
      training_certificate: t('upload_certificates'),
      visa_slip: t('visa_slip'),
      pe_number: t('upload_pe_number'),
    };
    return names[key] || key;
  };

  const categories = [
    { key: 'identity', label: t('identity_documents'), icon: 'id-card-outline' },
    { key: 'medical', label: t('medical_documents'), icon: 'medical-outline' },
    { key: 'training', label: t('training_documents'), icon: 'school-outline' },
    { key: 'visa', label: t('visa_travel_documents'), icon: 'airplane-outline' },
  ];

  const handleUpload = async (docId: string) => {
    // TODO: Implement document picker when expo-document-picker is installed
    // For now, simulate upload
    Alert.alert(
      t('upload_document'),
      'Document picker will be implemented. For now, this is a demo.',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('ok'),
          onPress: () => {
            setDocuments(
              documents.map((doc) =>
                doc.id === docId
                  ? { ...doc, status: 'uploaded' as const }
                  : doc
              )
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return '#00C6A1';
      case 'rejected':
        return '#EF4444';
      case 'under_review':
        return '#F59E0B';
      default:
        return isDark ? '#6B7280' : '#9CA3AF';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'uploaded':
        return t('status_uploaded');
      case 'under_review':
        return t('status_under_review');
      case 'accepted':
        return t('status_accepted');
      case 'rejected':
        return t('status_rejected');
      default:
        return t('pending');
    }
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
        <Text className={`text-xl font-bold flex-1 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
          {t('document_upload')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        {categories.map((category) => {
          const categoryDocs = documents.filter((doc) => doc.category === category.key);
          if (categoryDocs.length === 0) return null;

          return (
            <View key={category.key} style={{ marginBottom: 24 }}>
              <View className="flex-row items-center mb-4">
                <Ionicons name={category.icon as any} size={24} color="#00C6A1" style={{ marginRight: 8 }} />
                <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {category.label}
                </Text>
              </View>

              <View style={{ gap: 12 }}>
                {categoryDocs.map((doc) => (
                  <View
                    key={doc.id}
                    className={`rounded-2xl p-4 ${isDark ? 'bg-[#0A2F47]' : 'bg-white'}`}
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
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-1">
                        <Text className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
                          {getDocumentName(doc.name)}
                        </Text>
                        <View className="flex-row items-center">
                          <View
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: getStatusColor(doc.status) }}
                          />
                          <Text
                            className="text-sm"
                            style={{ color: getStatusColor(doc.status) }}
                          >
                            {getStatusLabel(doc.status)}
                          </Text>
                        </View>
                      </View>
                      {doc.status === 'pending' || doc.status === 'rejected' ? (
                        <TouchableOpacity
                          onPress={() => handleUpload(doc.id)}
                          className="bg-primary rounded-lg px-4 py-2"
                        >
                          <Text className="text-white text-sm font-semibold">{t('upload_document')}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={doc.status === 'accepted' ? '#00C6A1' : '#F59E0B'}
                        />
                      )}
                    </View>
                    {doc.notes && (
                      <View
                        className="mt-2 p-3 rounded-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : '#FEE2E2',
                        }}
                      >
                        <Text className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{doc.notes}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

