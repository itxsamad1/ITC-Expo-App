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
    'security_officer': 'Security Officer',
    'armed_security_officer': 'Armed Security Officer',
    'security_supervisor': 'Security Supervisor/Manager',
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
    
    // Advertising
    'earn_monthly': 'Earn $1,400 - $4,000 Monthly',
    'earn_monthly_subtitle': 'Start Your Journey Today',
    'unlock_opportunity': 'Unlock Your Opportunity',
    'apply_now_cta': 'Apply Now & Transform Your Future',
    
    // Job Overview
    'job_overview': 'Job Overview',
    'gross_salary': 'Gross Salary',
    'net_salary': 'Net Salary',
    'benefits': 'Benefits',
    'shift_allowance': 'Shift Allowance',
    'night_shift': 'Night Shift',
    'weekend_shift': 'Weekend Shift',
    'annual_leave': 'Annual Leave',
    'health_insurance': 'Health Insurance',
    'accommodation': 'Accommodation',
    'uniform': 'Uniform',
    'training_required': 'Training Required',
    'basic_training': 'Basic Training',
    'armed_training': 'Armed Training',
    'firearms_certification': 'Firearms Certification',
    'language_orientation': 'Language Orientation',
    'medical_clearance': 'Medical Clearance',
    'police_clearance': 'Police Clearance',
    
    // Visa Timeline
    'visa_timeline': 'Visa & Deployment Timeline',
    'step_1': 'Step 1',
    'step_2': 'Step 2',
    'step_3': 'Step 3',
    'step_4': 'Step 4',
    'step_5': 'Step 5',
    'step_6': 'Step 6',
    'step_7': 'Step 7',
    'registration_cv': 'Registration & CV Submission',
    'upload_cnic': 'Upload CNIC',
    'upload_cv': 'Upload CV',
    'add_basic_info': 'Add Basic Information',
    'medical_biometric': 'Medical & Biometric',
    'gamca_medical': 'GAMCA Medical Required',
    'biometric_beoe': 'Biometric for BE&OE',
    'approved_centers': 'Approved Medical Centers',
    'upload_medical_report': 'Upload Medical Report',
    'training_pakistan': 'Training (Pakistan)',
    'track_training_schedule': 'Track Training Schedule',
    'upload_certificates': 'Upload Certificates',
    'mark_completed': 'Mark Completed Steps',
    'visa_processing': 'Visa Processing',
    'submit_passport': 'Submit Passport',
    'visa_slip': 'Visa Slip / Block Visa',
    'processing_time': 'Processing Time: 60-90 days',
    'status_submitted': 'Submitted',
    'status_under_process': 'Under Process',
    'status_approved': 'Approved / Visa Slip Sent',
    'protector_process': 'Protector Process (PE Number)',
    'protector_checklist': 'Protector Checklist',
    'passport_copy': 'Passport Copy',
    'visa_copy': 'Visa Copy',
    'insurance_opf': 'Insurance (OPF)',
    'employment_contract': 'Employment Contract',
    'ticket': 'Ticket',
    'fee_challan': 'Fee Challan',
    'submitted_protectorate': 'Submitted to Protectorate of Emigrants - Karachi',
    'pe_number_issued': 'PE Number Issued',
    'upload_pe_number': 'Upload PE Number',
    'pre_departure': 'Pre-Departure Checklist',
    'packing_list': 'Packing List',
    'travel_briefing': 'Travel Briefing',
    'emergency_contacts': 'Emergency Contacts',
    'flight_schedule': 'Flight Schedule',
    'airport_reporting': 'Airport Reporting Time',
    'arrival_czech': 'Arrival in Czech Republic',
    'register_3_days': 'Register within 3 days (Mandatory)',
    'on_arrival_training': 'On-Arrival Training + Certification (68-017-M)',
    'accommodation_address': 'Accommodation Address',
    'employer_contact': 'Employer Contact',
    'safety_orientation': 'Safety Orientation',
    
    // Document Upload
    'document_upload': 'Document Upload',
    'identity_documents': 'Identity',
    'medical_documents': 'Medical',
    'training_documents': 'Training',
    'visa_travel_documents': 'Visa & Travel',
    'status_uploaded': 'Uploaded',
    'status_under_review': 'Under Review',
    'status_accepted': 'Accepted',
    'status_rejected': 'Rejected',
    'notes_corrections': 'Notes for Corrections',
    'upload_document': 'Upload Document',
    'select_file': 'Select File',
    
    // Status Tracking
    'application_status': 'Application Status',
    'application_submitted': 'Application Submitted',
    'shortlisted': 'Shortlisted',
    'interview_scheduled': 'Interview Scheduled',
    'interview_passed': 'Interview Passed',
    'medical_cleared': 'Medical Cleared',
    'training_completed': 'Training Completed',
    'visa_submitted': 'Visa Submitted',
    'visa_approved': 'Visa Approved',
    'protector_approved': 'Protector Approved',
    'ticket_issued': 'Ticket Issued',
    'deployment': 'Deployment',
    'estimated_duration': 'Estimated Duration',
    'description': 'Description',
    'current_status': 'Current Status',
    
    // Salary Calculator
    'salary_calculator': 'Salary & Benefits Calculator',
    'choose_category': 'Choose Category',
    'unarmed_guard': 'Unarmed Guard (Corporate)',
    'armed_guard': 'Armed Guard (VIP/Embassy)',
    'supervisor': 'Supervisor / Shift Leader',
    'after_taxes': 'After Taxes',
    'night_shift_allowance': 'Night Shift Allowance',
    'annual_leave_value': 'Annual Leave Value',
    'accommodation_savings': 'Accommodation Savings',
    'calculate': 'Calculate',
    'monthly_earnings': 'Monthly Earnings',
    'yearly_earnings': 'Yearly Earnings',
    
    // Cost Breakdown
    'cost_breakdown': 'Cost Breakdown',
    'mandatory_costs': 'Mandatory Costs',
    'visa_cost': 'Visa Cost',
    'medical_cost': 'Medical Cost',
    'protector_fee': 'Protector Fee',
    'insurance_cost': 'Insurance Cost',
    'ticket_cost': 'Ticket Cost',
    'total_cost': 'Total Cost',
    'cost_transparency': 'These costs are mandatory by BE&OE, not by ITC',
    
    // FAQs
    'faqs': 'Frequently Asked Questions',
    'how_long_visa': 'How long does visa processing take?',
    'visa_processing_time': 'Visa processing typically takes 60-90 days from submission.',
    'medical_requirements': 'What are the medical requirements?',
    'medical_requirements_answer': 'You need to complete GAMCA medical examination at approved centers and upload the report.',
    'protector_process_question': 'What is the Protector process?',
    'protector_process_answer': 'After visa approval, you must submit documents to Protectorate of Emigrants in Karachi to obtain PE number.',
    'czech_certification': 'Do I need Czech certification?',
    'czech_certification_answer': 'Yes, after arrival in Czech Republic, you must complete certification under Security Officer (68-017-M) within 3 days.',
    'accommodation_details': 'What about accommodation?',
    'accommodation_details_answer': 'Shared accommodation is provided by employer. Details will be shared before departure.',
    'savings_potential': 'How much can I save per month?',
    'savings_potential_answer': 'With accommodation and insurance provided, you can save 70-80% of your net salary.',
    'working_hours': 'What are the working hours?',
    'working_hours_answer': 'Standard shifts are 8-12 hours. Night and weekend shifts offer 25-30% extra allowance.',
    
    // Support
    'support': 'Support',
    'live_chat': 'Live Chat',
    'application_manager': 'Application Manager Contact',
    'emergency_helpline': 'Emergency Helpline',
    'itc_office_address': 'ITC Office Address',
    'czech_partner_emergency': 'Czech Partner Emergency Contacts',
    'contact_us': 'Contact Us',
    'send_message': 'Send Message',
    'call_now': 'Call Now',
    'email_us': 'Email Us',
    
    // Eligibility Checker
    'eligibility_checker': 'Job Eligibility Checker',
    'check_eligibility': 'Check Your Eligibility',
    'age_21_45': 'Age between 21-45 years?',
    'passport_valid_2_years': 'Passport valid for 2+ years?',
    'medically_fit': 'Medically fit?',
    'police_clearance_available': 'Police clearance available?',
    'willing_training': 'Willing to complete training?',
    'english_basics': 'Basic English knowledge?',
    'eligible': 'Eligible',
    'not_eligible': 'Not Eligible',
    'congratulations': 'Congratulations!',
    'you_are_eligible': 'You are eligible to apply',
    'apply_job': 'Apply for Job',
    'sorry': 'Sorry',
    'not_eligible_message': 'You are not currently eligible. Please check requirements.',
    'view_requirements': 'View Requirements',
    
    // User Agreements
    'user_agreements': 'User Agreements & Legal',
    'employment_contract_preview': 'Employment Contract Preview',
    'consent_forms': 'Consent Forms',
    'gdpr_privacy': 'GDPR & Local Privacy Info',
    'czech_labour_rights': 'Czech Labour Rights Summary',
    'terms_of_service': 'Terms of Service',
    'refund_cancellation': 'Refund/Cancellation Policies',
    'read_more': 'Read More',
    'agree': 'Agree',
    'download': 'Download',
    
    // Additional
    'days': 'days',
    'weeks': 'weeks',
    'months': 'months',
    'years': 'years',
    'per_month': 'per month',
    'per_year': 'per year',
    'czk': 'CZK',
    'usd': 'USD',
    'pkr': 'PKR',
    'equivalent': 'Equivalent',
    'yes': 'Yes',
    'no': 'No',
    'completed': 'Completed',
    'pending': 'Pending',
    'in_progress': 'In Progress',
    'next': 'Next',
    'previous': 'Previous',
    'save': 'Save',
    'submit': 'Submit',
    'view_details': 'View Details',
    'ok': 'OK',
    'error': 'Error',
    'success': 'Success',
    'step': 'Step',
    'salary_breakdown': 'Salary Breakdown',
    'recommended_for_you': 'Recommended for You',
    'based_on_profile': 'Based on your profile',
    'phone_number': 'Phone Number',
    'passport_number': 'Passport Number',
    'destination_country': 'Destination Country',
    'cnic': 'CNIC',
    'optional': 'Optional',
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
    'security_officer': 'سیکیورٹی آفیسر',
    'armed_security_officer': 'مسلح سیکیورٹی آفیسر',
    'security_supervisor': 'سیکیورٹی سپروائزر/مینیجر',
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
    
    // Advertising
    'earn_monthly': 'ماہانہ $1,400 - $4,000 کمائیں',
    'earn_monthly_subtitle': 'آج ہی چیک جمہوریہ کا سفر شروع کریں',
    'unlock_opportunity': 'اپنا موقع کھولیں',
    'apply_now_cta': 'ابھی درخواست دیں اور اپنا مستقبل بدلیں',
    
    // Job Overview
    'job_overview': 'ملازمت کا جائزہ',
    'gross_salary': 'کل تنخواہ',
    'net_salary': 'خالص تنخواہ',
    'benefits': 'فوائد',
    'shift_allowance': 'شفٹ الاؤنس',
    'night_shift': 'رات کی شفٹ',
    'weekend_shift': 'ہفتے کے آخر کی شفٹ',
    'annual_leave': 'سالانہ چھٹیاں',
    'health_insurance': 'صحت کی انشورنس',
    'accommodation': 'رہائش',
    'uniform': 'یونیفارم',
    'training_required': 'مطلوبہ تربیت',
    'basic_training': 'بنیادی تربیت',
    'armed_training': 'مسلح تربیت',
    'firearms_certification': 'بندوق کی تصدیق',
    'language_orientation': 'زبان کی رہنمائی',
    'medical_clearance': 'طبی صفائی',
    'police_clearance': 'پولیس صفائی',
    
    // Visa Timeline
    'visa_timeline': 'ویزا اور تعیناتی کا ٹائم لائن',
    'step_1': 'مرحلہ 1',
    'step_2': 'مرحلہ 2',
    'step_3': 'مرحلہ 3',
    'step_4': 'مرحلہ 4',
    'step_5': 'مرحلہ 5',
    'step_6': 'مرحلہ 6',
    'step_7': 'مرحلہ 7',
    'registration_cv': 'رجسٹریشن اور سی وی جمع کروانا',
    'upload_cnic': 'CNIC اپ لوڈ کریں',
    'upload_cv': 'CV اپ لوڈ کریں',
    'add_basic_info': 'بنیادی معلومات شامل کریں',
    'medical_biometric': 'طبی اور بائیومیٹرک',
    'gamca_medical': 'GAMCA طبی معائنہ ضروری',
    'biometric_beoe': 'BE&OE کے لیے بائیومیٹرک',
    'approved_centers': 'منظور شدہ طبی مراکز',
    'upload_medical_report': 'طبی رپورٹ اپ لوڈ کریں',
    'training_pakistan': 'تربیت (پاکستان)',
    'track_training_schedule': 'تربیت کا شیڈول ٹریک کریں',
    'upload_certificates': 'سرٹیفکیٹ اپ لوڈ کریں',
    'mark_completed': 'مکمل شدہ مراحل نشان زد کریں',
    'visa_processing': 'ویزا کی کارروائی',
    'submit_passport': 'پاسپورٹ جمع کروائیں',
    'visa_slip': 'ویزا سلپ / بلاک ویزا',
    'processing_time': 'کارروائی کا وقت: 60-90 دن',
    'status_submitted': 'جمع کرایا گیا',
    'status_under_process': 'کارروائی جاری',
    'status_approved': 'منظور شدہ / ویزا سلپ بھیجا گیا',
    'protector_process': 'پروٹیکٹر عمل (PE نمبر)',
    'protector_checklist': 'پروٹیکٹر چیک لسٹ',
    'passport_copy': 'پاسپورٹ کی کاپی',
    'visa_copy': 'ویزا کی کاپی',
    'insurance_opf': 'انشورنس (OPF)',
    'employment_contract': 'ملازمت کا معاہدہ',
    'ticket': 'ٹکٹ',
    'fee_challan': 'فی چالان',
    'submitted_protectorate': 'پروٹیکٹوریٹ آف امیگرنٹس - کراچی میں جمع کرایا گیا',
    'pe_number_issued': 'PE نمبر جاری کیا گیا',
    'upload_pe_number': 'PE نمبر اپ لوڈ کریں',
    'pre_departure': 'روانگی سے پہلے چیک لسٹ',
    'packing_list': 'پیکنگ لسٹ',
    'travel_briefing': 'سفر کی بریفنگ',
    'emergency_contacts': 'ایمرجنسی رابطے',
    'flight_schedule': 'فلائٹ شیڈول',
    'airport_reporting': 'ہوائی اڈے کی رپورٹنگ کا وقت',
    'arrival_czech': 'چیک جمہوریہ میں آمد',
    'register_3_days': '3 دنوں کے اندر رجسٹر کریں (لازمی)',
    'on_arrival_training': 'آمد پر تربیت + تصدیق (68-017-M)',
    'accommodation_address': 'رہائش کا پتہ',
    'employer_contact': 'آجر کا رابطہ',
    'safety_orientation': 'حفاظت کی رہنمائی',
    
    // Document Upload
    'document_upload': 'دستاویز اپ لوڈ',
    'identity_documents': 'شناخت',
    'medical_documents': 'طبی',
    'training_documents': 'تربیت',
    'visa_travel_documents': 'ویزا اور سفر',
    'status_uploaded': 'اپ لوڈ شدہ',
    'status_under_review': 'جائزہ لیا جا رہا ہے',
    'status_accepted': 'قبول شدہ',
    'status_rejected': 'مسترد شدہ',
    'notes_corrections': 'تصحیح کے لیے نوٹس',
    'upload_document': 'دستاویز اپ لوڈ کریں',
    'select_file': 'فائل منتخب کریں',
    
    // Status Tracking
    'application_status': 'درخواست کی حیثیت',
    'application_submitted': 'درخواست جمع کرائی گئی',
    'shortlisted': 'شارٹ لسٹ',
    'interview_scheduled': 'انٹرویو شیڈول',
    'interview_passed': 'انٹرویو پاس',
    'medical_cleared': 'طبی صفائی',
    'training_completed': 'تربیت مکمل',
    'visa_submitted': 'ویزا جمع کرائی گئی',
    'visa_approved': 'ویزا منظور شدہ',
    'protector_approved': 'پروٹیکٹر منظور شدہ',
    'ticket_issued': 'ٹکٹ جاری',
    'deployment': 'تعیناتی',
    'estimated_duration': 'تخمینی مدت',
    'description': 'تفصیل',
    'current_status': 'موجودہ حیثیت',
    
    // Salary Calculator
    'salary_calculator': 'تنخواہ اور فوائد کیلکولیٹر',
    'choose_category': 'زمرہ منتخب کریں',
    'unarmed_guard': 'غیر مسلح گارڈ (کارپوریٹ)',
    'armed_guard': 'مسلح گارڈ (VIP/ایمبیسی)',
    'supervisor': 'سپروائزر / شفٹ لیڈر',
    'after_taxes': 'ٹیکس کے بعد',
    'night_shift_allowance': 'رات کی شفٹ الاؤنس',
    'annual_leave_value': 'سالانہ چھٹیوں کی قیمت',
    'accommodation_savings': 'رہائش کی بچت',
    'calculate': 'حساب کریں',
    'monthly_earnings': 'ماہانہ آمدنی',
    'yearly_earnings': 'سالانہ آمدنی',
    
    // Cost Breakdown
    'cost_breakdown': 'لاگت کی تفصیل',
    'mandatory_costs': 'لازمی اخراجات',
    'visa_cost': 'ویزا کی لاگت',
    'medical_cost': 'طبی لاگت',
    'protector_fee': 'پروٹیکٹر فیس',
    'insurance_cost': 'انشورنس لاگت',
    'ticket_cost': 'ٹکٹ لاگت',
    'total_cost': 'کل لاگت',
    'cost_transparency': 'یہ اخراجات BE&OE کی طرف سے لازمی ہیں، ITC کی طرف سے نہیں',
    
    // FAQs
    'faqs': 'اکثر پوچھے جانے والے سوالات',
    'how_long_visa': 'ویزا کی کارروائی میں کتنا وقت لگتا ہے؟',
    'visa_processing_time': 'ویزا کی کارروائی عام طور پر جمع کرانے سے 60-90 دن لگتی ہے۔',
    'medical_requirements': 'طبی تقاضے کیا ہیں؟',
    'medical_requirements_answer': 'آپ کو منظور شدہ مراکز پر GAMCA طبی معائنہ مکمل کرنا ہوگا اور رپورٹ اپ لوڈ کرنی ہوگی۔',
    'protector_process_question': 'پروٹیکٹر عمل کیا ہے؟',
    'protector_process_answer': 'ویزا کی منظوری کے بعد، آپ کو PE نمبر حاصل کرنے کے لیے کراچی میں پروٹیکٹوریٹ آف امیگرنٹس میں دستاویزات جمع کرانی ہوں گی۔',
    'czech_certification': 'کیا مجھے چیک تصدیق کی ضرورت ہے؟',
    'czech_certification_answer': 'ہاں، چیک جمہوریہ میں آمد کے بعد، آپ کو 3 دنوں کے اندر سیکیورٹی آفیسر (68-017-M) کے تحت تصدیق مکمل کرنی ہوگی۔',
    'accommodation_details': 'رہائش کے بارے میں کیا؟',
    'accommodation_details_answer': 'مشترکہ رہائش آجر کی طرف سے فراہم کی جاتی ہے۔ تفصیلات روانگی سے پہلے شیئر کی جائیں گی۔',
    'savings_potential': 'میں ماہانہ کتنا بچا سکتا ہوں؟',
    'savings_potential_answer': 'رہائش اور انشورنس فراہم کیے جانے کے ساتھ، آپ اپنی خالص تنخواہ کا 70-80% بچا سکتے ہیں۔',
    'working_hours': 'کام کے اوقات کیا ہیں؟',
    'working_hours_answer': 'معیاری شفٹیں 8-12 گھنٹے ہیں۔ رات اور ہفتے کے آخر کی شفٹیں 25-30% اضافی الاؤنس پیش کرتی ہیں۔',
    
    // Support
    'support': 'سپورٹ',
    'live_chat': 'لائیو چیٹ',
    'application_manager': 'درخواست مینیجر کا رابطہ',
    'emergency_helpline': 'ایمرجنسی ہیلپ لائن',
    'itc_office_address': 'ITC دفتر کا پتہ',
    'czech_partner_emergency': 'چیک پارٹنر ایمرجنسی رابطے',
    'contact_us': 'ہم سے رابطہ کریں',
    'send_message': 'پیغام بھیجیں',
    'call_now': 'ابھی کال کریں',
    'email_us': 'ہمیں ای میل کریں',
    
    // Eligibility Checker
    'eligibility_checker': 'ملازمت کی اہلیت چیکر',
    'check_eligibility': 'اپنی اہلیت چیک کریں',
    'age_21_45': 'عمر 21-45 سال کے درمیان؟',
    'passport_valid_2_years': 'پاسپورٹ 2+ سال کے لیے درست؟',
    'medically_fit': 'طبی طور پر فٹ؟',
    'police_clearance_available': 'پولیس صفائی دستیاب؟',
    'willing_training': 'تربیت مکمل کرنے کے لیے تیار؟',
    'english_basics': 'بنیادی انگریزی علم؟',
    'eligible': 'اہل',
    'not_eligible': 'اہل نہیں',
    'congratulations': 'مبارک ہو!',
    'you_are_eligible': 'آپ درخواست دینے کے اہل ہیں',
    'apply_job': 'ملازمت کے لیے درخواست دیں',
    'sorry': 'معذرت',
    'not_eligible_message': 'آپ فی الوقت اہل نہیں ہیں۔ براہ کرم تقاضے چیک کریں۔',
    'view_requirements': 'تقاضے دیکھیں',
    
    // User Agreements
    'user_agreements': 'صارف معاہدے اور قانونی',
    'employment_contract_preview': 'ملازمت کا معاہدہ پیش منظر',
    'consent_forms': 'رضامندی فارم',
    'gdpr_privacy': 'GDPR اور مقامی رازداری کی معلومات',
    'czech_labour_rights': 'چیک مزدور حقوق کا خلاصہ',
    'terms_of_service': 'سروس کی شرائط',
    'refund_cancellation': 'واپسی/منسوخی کی پالیسیاں',
    'read_more': 'مزید پڑھیں',
    'agree': 'متفق',
    'download': 'ڈاؤن لوڈ کریں',
    
    // Additional
    'days': 'دن',
    'weeks': 'ہفتے',
    'months': 'مہینے',
    'years': 'سال',
    'per_month': 'فی مہینہ',
    'per_year': 'فی سال',
    'czk': 'CZK',
    'usd': 'USD',
    'pkr': 'PKR',
    'equivalent': 'مساوی',
    'yes': 'ہاں',
    'no': 'نہیں',
    'completed': 'مکمل',
    'pending': 'زیر التواء',
    'in_progress': 'جاری',
    'next': 'اگلا',
    'previous': 'پچھلا',
    'save': 'محفوظ کریں',
    'submit': 'جمع کروائیں',
    'view_details': 'تفصیلات دیکھیں',
    'ok': 'ٹھیک ہے',
    'error': 'خرابی',
    'success': 'کامیابی',
    'step': 'مرحلہ',
    'salary_breakdown': 'تنخواہ کی تفصیل',
    'recommended_for_you': 'آپ کے لیے تجویز کردہ',
    'based_on_profile': 'آپ کی پروفائل کی بنیاد پر',
    'phone_number': 'فون نمبر',
    'passport_number': 'پاسپورٹ نمبر',
    'destination_country': 'منزل کا ملک',
    'cnic': 'CNIC',
    'optional': 'اختیاری',
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

