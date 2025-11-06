import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/contexts/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const jobCategories = ['All', 'Tech', 'Finance', 'Education', 'Health', 'Marketing'];

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  flag: string;
  category: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Acme Inc.',
    location: 'Berlin, Germany',
    category: 'Tech',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTTPELjSvE1_qWVzUcS2UFPnAgF4cAelRRtVgfobBNhblKuqmcmi1wuJHGCUosUejpUA7vCVifYg396QwjSp_pE5kpSvYeG7E5EVK89cJ4pAunebHYHpdCSm7aTByHk4Sgy0Ft2XVLQdCz_Fcq1mfXCOhW0vNcw-_0ethc4keOhs0zdHem-ahRqIGR4hod4faxbOybwLjnqCEQJDCbWHpzjBJP5BQEPe3emHvgnNEWO7amNmxQlphVlGfWgflPgs5hR9AavH1banQ',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7v1QIB0-GpESkZzo-8PjkMgGEEmrU2a6DC1l2V7TRgHdyAtsaJedLUI0BaMfBLFGGlNvEhL3gS0V_qaMSm7vE5gz8Yyx0KXmDK5052tUQG5dWaZ6TdGoZMilD4lYYEdIi0oucMlqekfse_LQQZaeQeOEgS794AEZIdKY-MeY3U2WOOuHJ8okbH-lu7k1v7DfFyW1iPx-r6r30Rsk463fmqGPU4Pk8V5UcLKaSLtHZtQrbBbAM-SDv_Z8xU1GWzUdAmjmQZfqbSMg',
  },
  {
    id: 2,
    title: 'Financial Analyst',
    company: 'Globex Corporation',
    location: 'London, UK',
    category: 'Finance',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDypW88ub2YIneeEzad1yHpGUCqGel40PMEYUaQfmnzP5ri-2zw079cJSZZPZDty1zlwsp7x4E6S2ARzStXkV7Mme2GApfsdU0YJquOY9j5WHljmSS0L26ibmRgnTIILLOpWYx0ADvT7c3EjRWkyBumL40RFZfTIHFZ2wOr-2wjyk43EXoaNlNcl7XduM2RlGEZwcqGoDFNK5pAqjk9Bpl9-9oy9E5ym8bqOmAKPwQu1jEM140eLWpC4tfut9em_mNOachyGbu3Lc',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqRpDYtUdv1fpPr5e2R-vEhQt0bSBP23gl9PUKpxuiKPHY1wZENPP--zhMRtpAx2Hjvynj6lHSXryt0DCBypwQyp4KMcgRDgmSsyIgieO-yNv08doyc6pYNsz-AXiuE7q1oXc7fcbJELbQwzhSHii71wxF9DyfDUMKKb8m8Xhqt-VlU5G91fAQUT19Trc4YIR9YVvegYMDrx93ntObhO73rozj_BWFAe3jzinwXKglOGTOz4zHmxkAUp6k86W5c7nQa3sjIwOI26g',
  },
  {
    id: 3,
    title: 'Digital Marketing Manager',
    company: 'Soylent Corp',
    location: 'Tokyo, Japan',
    category: 'Marketing',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHUXczfSnlkcQ0yDN9vf8s9z73FWVxRjNOpkk7YYLvUBYebiNysldlDTY50Xrggwhfo0bLl5Xr1Xhl-YthTwfmjT8r9fajqEmnHbHJX500nkxc6DxT5SPOmfnkAgVsivurDoxCDRcanATEcNVB6aUEtOtpdDgBEPzxwNwdGnrZW98-q4nKqKg5t1AXPYBFM1CoRL2YSRAHGJd3aA_g0jUNTULDTWPZxKiQv734wNknvv9keggkrwHlBmCOd90fYO7SPkGvsGaaZaU',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdNwJySU68Zr4QkWZl6D3cZ1IZLVuEb1nqk8aHCt3cjaLrZqM08-NpyF-7Djh1nrZjhaWr3ZuIjvCF8zOOuLkEfJrTfATCFMfUmejU5BppCDMtN4pZZh0mBRpoFdVTuNT7bo0c-JuCYvzFq-pGKysWO2euK_hUB8eUZF66a1YDWpXbcx2Y6b1i9T9fuKQ1d7q8B6TUZL2JIcc2_CdJVZ5BBlIb6IVfKu8ICHsDinhgF-MH48jqMc4HEftsKoBYOQVWWWiSPbh6ixw',
  },
  {
    id: 4,
    title: 'Lead UX/UI Designer',
    company: 'Initech',
    location: 'Toronto, Canada',
    category: 'Tech',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTgkrAHYSKm_62ZfVx-FYSg6iQP1ZLDp-H5XV8k8RuzX073pWBAMrAeAXgSAI29jxS6M08gN6LPlDz4poyzHBUGWsFEUsuvUi3W3ygXqR6AZlIQ123BKeCbDWP9yLhNy1YW9zT5mKX49pQG9nXdtgyKfw36f-Su6cUpFh1WA3GVoQZQY3wThUtW2YngUpm7CyuRQgRh6Q984NPYCEXgY1Ryb_ieGLF0-rpTqwBBEZAu9ewJWJ9M_KlkXK9hlZ0w5jxysfZcGOaAZ8',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbMpzq9kskFrggkafUYFqlhq8Sy4csxRNmMfV-QRvUgtUSC6WIM-JvzFXS8kVdBvtJfW_HvcDzvukpJs3SB3l2Rx_mfaViR9exdYuI8Ep3UnNKxzr6PQfN71e9wwLhwypSoSrdxtteV0Rbwr2RZ6pErIlO8KwNGO8xeCTq-sMDOp_HeNyBAZA7xAGkg45bQesPZ1CAMAw0dj7WLEjbjfsNZco76hDaidYPc09Ghre3yBNx-Boug6cA7OEN2M2LcgMO6AHGiGRUjkc',
  },
  {
    id: 5,
    title: 'Full Stack Developer',
    company: 'TechSolutions Inc.',
    location: 'San Francisco, USA',
    category: 'Tech',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTTPELjSvE1_qWVzUcS2UFPnAgF4cAelRRtVgfobBNhblKuqmcmi1wuJHGCUosUejpUA7vCVifYg396QwjSp_pE5kpSvYeG7E5EVK89cJ4pAunebHYHpdCSm7aTByHk4Sgy0Ft2XVLQdCz_Fcq1mfXCOhW0vNcw-_0ethc4keOhs0zdHem-ahRqIGR4hod4faxbOybwLjnqCEQJDCbWHpzjBJP5BQEPe3emHvgnNEWO7amNmxQlphVlGfWgflPgs5hR9AavH1banQ',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7v1QIB0-GpESkZzo-8PjkMgGEEmrU2a6DC1l2V7TRgHdyAtsaJedLUI0BaMfBLFGGlNvEhL3gS0V_qaMSm7vE5gz8Yyx0KXmDK5052tUQG5dWaZ6TdGoZMilD4lYYEdIi0oucMlqekfse_LQQZaeQeOEgS794AEZIdKY-MeY3U2WOOuHJ8okbH-lu7k1v7DfFyW1iPx-r6r30Rsk463fmqGPU4Pk8V5UcLKaSLtHZtQrbBbAM-SDv_Z8xU1GWzUdAmjmQZfqbSMg',
  },
  {
    id: 6,
    title: 'Investment Banker',
    company: 'Goldman Sachs',
    location: 'New York, USA',
    category: 'Finance',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDypW88ub2YIneeEzad1yHpGUCqGel40PMEYUaQfmnzP5ri-2zw079cJSZZPZDty1zlwsp7x4E6S2ARzStXkV7Mme2GApfsdU0YJquOY9j5WHljmSS0L26ibmRgnTIILLOpWYx0ADvT7c3EjRWkyBumL40RFZfTIHFZ2wOr-2wjyk43EXoaNlNcl7XduM2RlGEZwcqGoDFNK5pAqjk9Bpl9-9oy9E5ym8bqOmAKPwQu1jEM140eLWpC4tfut9em_mNOachyGbu3Lc',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7v1QIB0-GpESkZzo-8PjkMgGEEmrU2a6DC1l2V7TRgHdyAtsaJedLUI0BaMfBLFGGlNvEhL3gS0V_qaMSm7vE5gz8Yyx0KXmDK5052tUQG5dWaZ6TdGoZMilD4lYYEdIi0oucMlqekfse_LQQZaeQeOEgS794AEZIdKY-MeY3U2WOOuHJ8okbH-lu7k1v7DfFyW1iPx-r6r30Rsk463fmqGPU4Pk8V5UcLKaSLtHZtQrbBbAM-SDv_Z8xU1GWzUdAmjmQZfqbSMg',
  },
  {
    id: 7,
    title: 'High School Teacher',
    company: 'International School',
    location: 'Dubai, UAE',
    category: 'Education',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTgkrAHYSKm_62ZfVx-FYSg6iQP1ZLDp-H5XV8k8RuzX073pWBAMrAeAXgSAI29jxS6M08gN6LPlDz4poyzHBUGWsFEUsuvUi3W3ygXqR6AZlIQ123BKeCbDWP9yLhNy1YW9zT5mKX49pQG9nXdtgyKfw36f-Su6cUpFh1WA3GVoQZQY3wThUtW2YngUpm7CyuRQgRh6Q984NPYCEXgY1Ryb_ieGLF0-rpTqwBBEZAu9ewJWJ9M_KlkXK9hlZ0w5jxysfZcGOaAZ8',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbMpzq9kskFrggkafUYFqlhq8Sy4csxRNmMfV-QRvUgtUSC6WIM-JvzFXS8kVdBvtJfW_HvcDzvukpJs3SB3l2Rx_mfaViR9exdYuI8Ep3UnNKxzr6PQfN71e9wwLhwypSoSrdxtteV0Rbwr2RZ6pErIlO8KwNGO8xeCTq-sMDOp_HeNyBAZA7xAGkg45bQesPZ1CAMAw0dj7WLEjbjfsNZco76hDaidYPc09Ghre3yBNx-Boug6cA7OEN2M2LcgMO6AHGiGRUjkc',
  },
  {
    id: 8,
    title: 'Registered Nurse',
    company: 'City Hospital',
    location: 'Melbourne, Australia',
    category: 'Health',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHUXczfSnlkcQ0yDN9vf8s9z73FWVxRjNOpkk7YYLvUBYebiNysldlDTY50Xrggwhfo0bLl5Xr1Xhl-YthTwfmjT8r9fajqEmnHbHJX500nkxc6DxT5SPOmfnkAgVsivurDoxCDRcanATEcNVB6aUEtOtpdDgBEPzxwNwdGnrZW98-q4nKqKg5t1AXPYBFM1CoRL2YSRAHGJd3aA_g0jUNTULDTWPZxKiQv734wNknvv9keggkrwHlBmCOd90fYO7SPkGvsGaaZaU',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdNwJySU68Zr4QkWZl6D3cZ1IZLVuEb1nqk8aHCt3cjaLrZqM08-NpyF-7Djh1nrZjhaWr3ZuIjvCF8zOOuLkEfJrTfATCFMfUmejU5BppCDMtN4pZZh0mBRpoFdVTuNT7bo0c-JuCYvzFq-pGKysWO2euK_hUB8eUZF66a1YDWpXbcx2Y6b1i9T9fuKQ1d7q8B6TUZL2JIcc2_CdJVZ5BBlIb6IVfKu8ICHsDinhgF-MH48jqMc4HEftsKoBYOQVWWWiSPbh6ixw',
  },
  {
    id: 9,
    title: 'React Native Developer',
    company: 'AppWorks',
    location: 'Singapore',
    category: 'Tech',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTTPELjSvE1_qWVzUcS2UFPnAgF4cAelRRtVgfobBNhblKuqmcmi1wuJHGCUosUejpUA7vCVifYg396QwjSp_pE5kpSvYeG7E5EVK89cJ4pAunebHYHpdCSm7aTByHk4Sgy0Ft2XVLQdCz_Fcq1mfXCOhW0vNcw-_0ethc4keOhs0zdHem-ahRqIGR4hod4faxbOybwLjnqCEQJDCbWHpzjBJP5BQEPe3emHvgnNEWO7amNmxQlphVlGfWgflPgs5hR9AavH1banQ',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7v1QIB0-GpESkZzo-8PjkMgGEEmrU2a6DC1l2V7TRgHdyAtsaJedLUI0BaMfBLFGGlNvEhL3gS0V_qaMSm7vE5gz8Yyx0KXmDK5052tUQG5dWaZ6TdGoZMilD4lYYEdIi0oucMlqekfse_LQQZaeQeOEgS794AEZIdKY-MeY3U2WOOuHJ8okbH-lu7k1v7DfFyW1iPx-r6r30Rsk463fmqGPU4Pk8V5UcLKaSLtHZtQrbBbAM-SDv_Z8xU1GWzUdAmjmQZfqbSMg',
  },
  {
    id: 10,
    title: 'Accountant',
    company: 'Deloitte',
    location: 'Paris, France',
    category: 'Finance',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDypW88ub2YIneeEzad1yHpGUCqGel40PMEYUaQfmnzP5ri-2zw079cJSZZPZDty1zlwsp7x4E6S2ARzStXkV7Mme2GApfsdU0YJquOY9j5WHljmSS0L26ibmRgnTIILLOpWYx0ADvT7c3EjRWkyBumL40RFZfTIHFZ2wOr-2wjyk43EXoaNlNcl7XduM2RlGEZwcqGoDFNK5pAqjk9Bpl9-9oy9E5ym8bqOmAKPwQu1jEM140eLWpC4tfut9em_mNOachyGbu3Lc',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqRpDYtUdv1fpPr5e2R-vEhQt0bSBP23gl9PUKpxuiKPHY1wZENPP--zhMRtpAx2Hjvynj6lHSXryt0DCBypwQyp4KMcgRDgmSsyIgieO-yNv08doyc6pYNsz-AXiuE7q1oXc7fcbJELbQwzhSHii71wxF9DyfDUMKKb8m8Xhqt-VlU5G91fAQUT19Trc4YIR9YVvegYMDrx93ntObhO73rozj_BWFAe3jzinwXKglOGTOz4zHmxkAUp6k86W5c7nQa3sjIwOI26g',
  },
  {
    id: 11,
    title: 'University Professor',
    company: 'Oxford University',
    location: 'Oxford, UK',
    category: 'Education',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTgkrAHYSKm_62ZfVx-FYSg6iQP1ZLDp-H5XV8k8RuzX073pWBAMrAeAXgSAI29jxS6M08gN6LPlDz4poyzHBUGWsFEUsuvUi3W3ygXqR6AZlIQ123BKeCbDWP9yLhNy1YW9zT5mKX49pQG9nXdtgyKfw36f-Su6cUpFh1WA3GVoQZQY3wThUtW2YngUpm7CyuRQgRh6Q984NPYCEXgY1Ryb_ieGLF0-rpTqwBBEZAu9ewJWJ9M_KlkXK9hlZ0w5jxysfZcGOaAZ8',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbMpzq9kskFrggkafUYFqlhq8Sy4csxRNmMfV-QRvUgtUSC6WIM-JvzFXS8kVdBvtJfW_HvcDzvukpJs3SB3l2Rx_mfaViR9exdYuI8Ep3UnNKxzr6PQfN71e9wwLhwypSoSrdxtteV0Rbwr2RZ6pErIlO8KwNGO8xeCTq-sMDOp_HeNyBAZA7xAGkg45bQesPZ1CAMAw0dj7WLEjbjfsNZco76hDaidYPc09Ghre3yBNx-Boug6cA7OEN2M2LcgMO6AHGiGRUjkc',
  },
  {
    id: 12,
    title: 'Social Media Specialist',
    company: 'BrandBoost',
    location: 'Amsterdam, Netherlands',
    category: 'Marketing',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHUXczfSnlkcQ0yDN9vf8s9z73FWVxRjNOpkk7YYLvUBYebiNysldlDTY50Xrggwhfo0bLl5Xr1Xhl-YthTwfmjT8r9fajqEmnHbHJX500nkxc6DxT5SPOmfnkAgVsivurDoxCDRcanATEcNVB6aUEtOtpdDgBEPzxwNwdGnrZW98-q4nKqKg5t1AXPYBFM1CoRL2YSRAHGJd3aA_g0jUNTULDTWPZxKiQv734wNknvv9keggkrwHlBmCOd90fYO7SPkGvsGaaZaU',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdNwJySU68Zr4QkWZl6D3cZ1IZLVuEb1nqk8aHCt3cjaLrZqM08-NpyF-7Djh1nrZjhaWr3ZuIjvCF8zOOuLkEfJrTfATCFMfUmejU5BppCDMtN4pZZh0mBRpoFdVTuNT7bo0c-JuCYvzFq-pGKysWO2euK_hUB8eUZF66a1YDWpXbcx2Y6b1i9T9fuKQ1d7q8B6TUZL2JIcc2_CdJVZ5BBlIb6IVfKu8ICHsDinhgF-MH48jqMc4HEftsKoBYOQVWWWiSPbh6ixw',
  },
  {
    id: 13,
    title: 'Medical Doctor',
    company: 'General Hospital',
    location: 'Zurich, Switzerland',
    category: 'Health',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHUXczfSnlkcQ0yDN9vf8s9z73FWVxRjNOpkk7YYLvUBYebiNysldlDTY50Xrggwhfo0bLl5Xr1Xhl-YthTwfmjT8r9fajqEmnHbHJX500nkxc6DxT5SPOmfnkAgVsivurDoxCDRcanATEcNVB6aUEtOtpdDgBEPzxwNwdGnrZW98-q4nKqKg5t1AXPYBFM1CoRL2YSRAHGJd3aA_g0jUNTULDTWPZxKiQv734wNknvv9keggkrwHlBmCOd90fYO7SPkGvsGaaZaU',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdNwJySU68Zr4QkWZl6D3cZ1IZLVuEb1nqk8aHCt3cjaLrZqM08-NpyF-7Djh1nrZjhaWr3ZuIjvCF8zOOuLkEfJrTfATCFMfUmejU5BppCDMtN4pZZh0mBRpoFdVTuNT7bo0c-JuCYvzFq-pGKysWO2euK_hUB8eUZF66a1YDWpXbcx2Y6b1i9T9fuKQ1d7q8B6TUZL2JIcc2_CdJVZ5BBlIb6IVfKu8ICHsDinhgF-MH48jqMc4HEftsKoBYOQVWWWiSPbh6ixw',
  },
];

export const ExploreJobsScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const tabHeight = useBottomTabBarHeight();
  const dynamicHeight = tabHeight * 0.6; // ~60% of tab height (adjust as needed)

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory === 'All' 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);

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
          }}
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold flex-1 text-center ${
            isDark ? 'text-white' : 'text-header-text'
          }`}
        >
          Explore Jobs
        </Text>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
          }}
        >
          <Ionicons name="search-outline" size={20} color={isDark ? '#fff' : '#111827'} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      {/* Filter Chips */}
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: isDark ? '#052639' : '#FFFFFF',
        maxHeight: 60,
      }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: 'center',
      }}
    >
      {jobCategories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
          activeOpacity={0.8}
          style={{
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor:
              selectedCategory === category
                ? '#00C6A1'
                : isDark
                ? '#0F3E5E'
                : '#F3F4F6',
            marginRight: 10,
            height: dynamicHeight * 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color:
                selectedCategory === category
                  ? '#FFFFFF'
                  : isDark
                  ? '#D1D5DB'
                  : '#374151',
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

      {/* Job Cards */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }} showsVerticalScrollIndicator={false}>
        {filteredJobs.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 48 }}>
            <Ionicons name="briefcase-outline" size={64} color={isDark ? '#6B7280' : '#9CA3AF'} />
            <Text className={`text-lg font-semibold mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No jobs found in {selectedCategory}
            </Text>
            <Text className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Try selecting a different category
            </Text>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            {filteredJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              onPress={() => router.push(`/job-details/${job.id}`)}
              className={`rounded-2xl p-5 ${
                isDark ? 'bg-[#0A2F47]' : 'bg-white'
              }`}
              activeOpacity={0.9}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View className="flex-row items-start mb-4">
                <Image
                  source={{ uri: job.logo }}
                  className="w-14 h-14 rounded-xl"
                  style={{ borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}
                />
                <View className="flex-1 ml-4">
                  <Text
                    className={`text-lg font-bold mb-1.5 ${
                      isDark ? 'text-white' : 'text-header-text'
                    }`}
                  >
                    {job.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Image source={{ uri: job.flag }} style={{ width: 20, height: 20, borderRadius: 9999, marginRight: 8 }} />
                    <Text
                      className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {job.company} • {job.location}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                className="rounded-xl h-11 items-center justify-center bg-primary"
                activeOpacity={0.9}
              >
                <Text className="text-white text-sm font-bold">Apply</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
