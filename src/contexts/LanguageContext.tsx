import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'welcome': 'Welcome',
    'welcome_back': 'Welcome back',
    'hi': 'Hi',
    'search': 'Search',
    'see_all': 'See all',
    'apply': 'Apply',
    'logout': 'Logout',
    'settings': 'Settings',
    'profile': 'Profile',
    'notifications': 'Notifications',
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'sign_out': 'Sign Out',
    'email': 'Email',
    'password': 'Password',
    'full_name': 'Full Name',
    'confirm_password': 'Confirm Password',
    'forgot_password': 'Forgot password?',
    'dont_have_account': "Don't have an account?",
    'already_have_account': 'Already have an account?',
    'or_continue_with': 'or continue with',
    'sign_in_with_google': 'Sign in with Google',
    'sign_in_with_linkedin': 'Sign in with LinkedIn',
    'sign_up_with_google': 'Sign up with Google',
    'sign_up_with_linkedin': 'Sign up with LinkedIn',
    'create_account': 'Create Account',
    'get_started': 'Get Started',
    
    // Home
    'home': 'Home',
    'visa_support': 'Visa Support',
    'training': 'Training',
    'upcoming_trainings': 'Upcoming Trainings',
    
    // Jobs
    'jobs': 'Jobs',
    'explore_jobs': 'Explore Jobs',
    'all': 'All',
    'driver': 'Driver',
    'security_guard': 'Security Guard',
    'truck_driver': 'Truck Driver',
    'car_driver': 'Car Driver',
    'security_guard_job': 'Security Guard',
    'no_jobs_found': 'No jobs found',
    'try_different_category': 'Try selecting a different category',
    
    // Profile
    'my_applications': 'My Applications',
    'saved_jobs': 'Saved Jobs',
    'edit_profile': 'Edit Profile',
    'change_password': 'Change Password',
    'app_version': 'App Version',
    'help_support': 'Help & Support',
    'about': 'About',
    'appearance': 'Appearance',
    'account': 'Account',
    'dark_mode': 'Dark Mode',
    'dark_mode_enabled': 'Dark mode is enabled',
    'light_mode_enabled': 'Light mode is enabled',
    
    // Training
    'training_programs': 'Training Programs',
    'driving_training': 'Driving Training',
    'security_training': 'Security Training',
    'register': 'Register',
    
    // Resources
    'resources': 'Resources',
    'resources_guidance': 'Resources & Guidance',
    'work_visa': 'Work Visa',
    'labour_rights': 'Labour Rights',
    'language_courses': 'Language Courses',
    'networking_events': 'Networking Events',
    'cultural_integration': 'Cultural Integration',
    
    // Onboarding
    'explore_careers': 'Explore Careers',
    'get_visa_guidance': 'Get Visa Guidance',
    'grow_internationally': 'Grow Internationally',
    'discover_job_opportunities': 'Discover job opportunities worldwide that match your skills and ambitions.',
    'access_visa_resources': 'Access comprehensive resources for navigating visa and immigration processes.',
    'utilize_resources': 'Utilize language resources and professional development tools to thrive.',
    'global_job_opportunities': 'Global job opportunities',
    'personalized_job_matching': 'Personalized job matching',
    'direct_employer_connections': 'Direct employer connections',
    'career_growth_resources': 'Career growth resources',
    'visa_application_support': 'Visa application support',
    'immigration_documentation': 'Immigration documentation',
    'legal_guidance_resources': 'Legal guidance resources',
    'country_specific_information': 'Country-specific information',
    'language_learning_tools': 'Language learning tools',
    'cultural_integration_guides': 'Cultural integration guides',
    'professional_networking': 'Professional networking',
    'skill_development_programs': 'Skill development programs',
    
    // Job Details
    'job_description': 'Job Description',
    'requirements': 'Requirements',
    'company_info': 'Company Info',
    'apply_now': 'Apply Now',
    'salary': 'Salary',
    'location': 'Location',
    'company': 'Company',
    
    // Language Selection
    'select_language': 'Select Language',
    'english': 'English',
    'urdu': 'Urdu',
    'continue': 'to continue',
    'cancel': 'Cancel',
  },
  ur: {
    // Common
    'welcome': 'خوش آمدید',
    'welcome_back': 'خوش آمدید',
    'hi': 'ہیلو',
    'search': 'تلاش کریں',
    'see_all': 'سب دیکھیں',
    'apply': 'درخواست دیں',
    'logout': 'لاگ آؤٹ',
    'settings': 'ترتیبات',
    'profile': 'پروفائل',
    'notifications': 'اطلاعات',
    'sign_in': 'سائن ان',
    'sign_up': 'سائن اپ',
    'sign_out': 'سائن آؤٹ',
    'email': 'ای میل',
    'password': 'پاس ورڈ',
    'full_name': 'پورا نام',
    'confirm_password': 'پاس ورڈ کی تصدیق کریں',
    'forgot_password': 'پاس ورڈ بھول گئے؟',
    'dont_have_account': 'اکاؤنٹ نہیں ہے؟',
    'already_have_account': 'پہلے سے اکاؤنٹ ہے؟',
    'or_continue_with': 'یا اس کے ساتھ جاری رکھیں',
    'sign_in_with_google': 'Google کے ساتھ سائن ان',
    'sign_in_with_linkedin': 'LinkedIn کے ساتھ سائن ان',
    'sign_up_with_google': 'Google کے ساتھ سائن اپ',
    'sign_up_with_linkedin': 'LinkedIn کے ساتھ سائن اپ',
    'create_account': 'اکاؤنٹ بنائیں',
    'get_started': 'شروع کریں',
    
    // Home
    'home': 'ہوم',
    'visa_support': 'ویزا سپورٹ',
    'training': 'ٹریننگ',
    'upcoming_trainings': 'آنے والی ٹریننگز',
    
    // Jobs
    'jobs': 'ملازمتیں',
    'explore_jobs': 'ملازمتیں تلاش کریں',
    'all': 'سب',
    'driver': 'ڈرائیور',
    'security_guard': 'سیکیورٹی گارڈ',
    'truck_driver': 'ٹرک ڈرائیور',
    'car_driver': 'کار ڈرائیور',
    'security_guard_job': 'سیکیورٹی گارڈ',
    'no_jobs_found': 'کوئی ملازمت نہیں ملی',
    'try_different_category': 'مختلف زمرہ منتخب کریں',
    
    // Profile
    'my_applications': 'میری درخواستیں',
    'saved_jobs': 'محفوظ شدہ ملازمتیں',
    'edit_profile': 'پروفائل میں ترمیم کریں',
    'change_password': 'پاس ورڈ تبدیل کریں',
    'app_version': 'ایپ ورژن',
    'help_support': 'مدد اور سپورٹ',
    'about': 'کے بارے میں',
    'appearance': 'ظاہری شکل',
    'account': 'اکاؤنٹ',
    'dark_mode': 'ڈارک موڈ',
    'dark_mode_enabled': 'ڈارک موڈ فعال ہے',
    'light_mode_enabled': 'لائٹ موڈ فعال ہے',
    
    // Training
    'training_programs': 'ٹریننگ پروگرامز',
    'driving_training': 'ڈرائیونگ ٹریننگ',
    'security_training': 'سیکیورٹی ٹریننگ',
    'register': 'رجسٹر کریں',
    
    // Resources
    'resources': 'وسائل',
    'resources_guidance': 'وسائل اور رہنمائی',
    'work_visa': 'کام کی ویزا',
    'labour_rights': 'مزدور حقوق',
    'language_courses': 'زبان کے کورسز',
    'networking_events': 'نیٹ ورکنگ ایونٹس',
    'cultural_integration': 'ثقافتی انضمام',
    
    // Onboarding
    'explore_careers': 'کیریئرز دریافت کریں',
    'get_visa_guidance': 'ویزا رہنمائی حاصل کریں',
    'grow_internationally': 'بین الاقوامی طور پر ترقی کریں',
    'discover_job_opportunities': 'دنیا بھر میں ملازمت کے مواقع دریافت کریں جو آپ کی مہارتوں سے میل کھاتے ہیں۔',
    'access_visa_resources': 'ویزا اور امیگریشن کے عمل میں رہنمائی کے لیے جامع وسائل تک رسائی حاصل کریں۔',
    'utilize_resources': 'زبان کے وسائل اور پیشہ ورانہ ترقی کے ٹولز استعمال کریں۔',
    'global_job_opportunities': 'عالمی ملازمت کے مواقع',
    'personalized_job_matching': 'ذاتی نوعیت کی ملازمت کی میچنگ',
    'direct_employer_connections': 'براہ راست آجر روابط',
    'career_growth_resources': 'کیریئر کی ترقی کے وسائل',
    'visa_application_support': 'ویزا درخواست کی مدد',
    'immigration_documentation': 'اميگریشن کی دستاویزات',
    'legal_guidance_resources': 'قانونی رہنمائی کے وسائل',
    'country_specific_information': 'ملک کی مخصوص معلومات',
    'language_learning_tools': 'زبان سیکھنے کے ٹولز',
    'cultural_integration_guides': 'ثقافتی انضمام کی رہنمائی',
    'professional_networking': 'پیشہ ورانہ نیٹ ورکنگ',
    'skill_development_programs': 'مہارت کی ترقی کے پروگرام',
    
    // Job Details
    'job_description': 'ملازمت کی تفصیل',
    'requirements': 'ضروریات',
    'company_info': 'کمپنی کی معلومات',
    'apply_now': 'ابھی درخواست دیں',
    'salary': 'تنخواہ',
    'location': 'مقام',
    'company': 'کمپنی',
    
    // Language Selection
    'select_language': 'زبان منتخب کریں',
    'english': 'انگریزی',
    'urdu': 'اردو',
    'continue': 'جاری رکھیں',
    'cancel': 'منسوخ کریں',
    'sign_up_to_start': 'اپنا سفر شروع کرنے کے لیے سائن اپ کریں',
  },
};

const LANGUAGE_STORAGE_KEY = '@itc_app:language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  const languageRef = useRef<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage === 'en' || savedLanguage === 'ur') {
          const lang = savedLanguage as Language;
          setLanguageState(lang);
          languageRef.current = lang;
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadLanguage();
  }, []);

  // Update ref whenever language changes
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const setLanguage = React.useCallback((lang: Language) => {
    console.log('[LanguageContext] Setting language to:', lang, 'Current:', languageRef.current);
    if (languageRef.current === lang) {
      console.log('[LanguageContext] Language already set to:', lang);
      return;
    }
    // Update state immediately
    setLanguageState(lang);
    languageRef.current = lang;
    // Save to storage in the background
    AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang).catch((error) => {
      console.error('Error saving language:', error);
    });
  }, []);

  const t = React.useCallback((key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  // Create context value - this will change when language changes, triggering re-renders
  const contextValue = React.useMemo(() => {
    console.log('[LanguageContext] Creating context value with language:', language);
    return {
      language,
      setLanguage,
      t,
    };
  }, [language, setLanguage, t]);

  // Don't block rendering - default to 'en' if still loading
  // This ensures the app works even if AsyncStorage is slow

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

