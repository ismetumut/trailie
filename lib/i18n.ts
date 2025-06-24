export type Language = 'en' | 'tr'

export interface Translations {
  // Common
  loading: string
  save: string
  cancel: string
  next: string
  back: string
  submit: string
  close: string
  edit: string
  delete: string
  search: string
  
  // Navigation
  home: string
  dashboard: string
  profile: string
  settings: string
  notifications: string
  
  // Authentication
  signIn: string
  signUp: string
  email: string
  password: string
  forgotPassword: string
  welcomeBack: string
  
  // Assessment
  personalityInventory: string
  expertiseInventory: string
  roleAssignment: string
  startAssessment: string
  completeAssessment: string
  assessmentProgress: string
  
  // Simulation
  simulationGame: string
  simulationComplete: string
  startSimulation: string
  simulationDay: string
  simulationScore: string
  
  // Career Tools
  cvGenerator: string
  jobBoard: string
  jobApplication: string
  interviewPrep: string
  networking: string
  coaching: string
  
  // Packages
  free: string
  core: string
  pro: string
  premium: string
  upgrade: string
  subscription: string
  payment: string
  
  // User Profile
  name: string
  profession: string
  personalityType: string
  expertiseLevel: string
  assignedRole: string
  competencies: string
  weaknesses: string
  
  // Questions
  socialBehavior: string
  decisionMaking: string
  stressResponse: string
  leadershipExperience: string
  problemSolving: string
  communicationSkills: string
  
  // Options
  activeParticipation: string
  preferListening: string
  smallGroupChat: string
  stayObservant: string
  quickIntuitive: string
  detailedAnalysis: string
  seekOthersOpinion: string
  relyOnExperience: string
  stayCalm: string
  takeAction: string
  seekSupport: string
  analyzeSituation: string
  noExperience: string
  smallProjectLeadership: string
  mediumTeamManagement: string
  largeOrganizationLeadership: string
  basicLevel: string
  intermediateLevel: string
  advancedLevel: string
  expertLevel: string
  needsImprovement: string
  adequate: string
  good: string
  excellent: string
  
  // Messages
  welcomeMessage: string
  assessmentComplete: string
  simulationCompleteMessage: string
  profileUpdated: string
  paymentSuccessful: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    close: 'Close',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    notifications: 'Notifications',
    
    // Authentication
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    welcomeBack: 'Welcome Back',
    
    // Assessment
    personalityInventory: 'Personality Inventory',
    expertiseInventory: 'Expertise Inventory',
    roleAssignment: 'Role Assignment',
    startAssessment: 'Start Assessment',
    completeAssessment: 'Complete Assessment',
    assessmentProgress: 'Assessment Progress',
    
    // Simulation
    simulationGame: 'Simulation Game',
    simulationComplete: 'Simulation Complete',
    startSimulation: 'Start Simulation',
    simulationDay: 'Day',
    simulationScore: 'Score',
    
    // Career Tools
    cvGenerator: 'CV Generator',
    jobBoard: 'Job Board',
    jobApplication: 'Job Application',
    interviewPrep: 'Interview Prep',
    networking: 'Networking',
    coaching: 'Coaching',
    
    // Packages
    free: 'Free',
    core: 'Core',
    pro: 'Pro',
    premium: 'Premium',
    upgrade: 'Upgrade',
    subscription: 'Subscription',
    payment: 'Payment',
    
    // User Profile
    name: 'Name',
    profession: 'Profession',
    personalityType: 'Personality Type',
    expertiseLevel: 'Expertise Level',
    assignedRole: 'Assigned Role',
    competencies: 'Competencies',
    weaknesses: 'Weaknesses',
    
    // Questions
    socialBehavior: 'How do you behave in social situations?',
    decisionMaking: 'What approach do you take when making decisions?',
    stressResponse: 'How do you react in stressful situations?',
    leadershipExperience: 'How would you rate your leadership experience?',
    problemSolving: 'What level are your problem-solving skills?',
    communicationSkills: 'How would you define your communication skills?',
    
    // Options
    activeParticipation: 'I actively participate in conversations',
    preferListening: 'I prefer to listen',
    smallGroupChat: 'I chat with small groups',
    stayObservant: 'I stay observant',
    quickIntuitive: 'I make quick and intuitive decisions',
    detailedAnalysis: 'I do detailed analysis',
    seekOthersOpinion: 'I seek others\' opinions',
    relyOnExperience: 'I rely on my experiences',
    stayCalm: 'I stay calm and look for solutions',
    takeAction: 'I take immediate action',
    seekSupport: 'I seek support',
    analyzeSituation: 'I analyze the situation',
    noExperience: 'No experience',
    smallProjectLeadership: 'I led small projects',
    mediumTeamManagement: 'I managed medium-sized teams',
    largeOrganizationLeadership: 'I have leadership experience in large organizations',
    basicLevel: 'Basic level',
    intermediateLevel: 'Intermediate level',
    advancedLevel: 'Advanced level',
    expertLevel: 'Expert level',
    needsImprovement: 'Needs improvement',
    adequate: 'Adequate',
    good: 'Good',
    excellent: 'Excellent',
    
    // Messages
    welcomeMessage: 'Welcome to Career Discovery',
    assessmentComplete: 'Assessment completed successfully!',
    simulationCompleteMessage: 'Simulation completed!',
    profileUpdated: 'Profile updated successfully!',
    paymentSuccessful: 'Payment successful!',
  },
  tr: {
    // Common
    loading: 'Yükleniyor...',
    save: 'Kaydet',
    cancel: 'İptal',
    next: 'İleri',
    back: 'Geri',
    submit: 'Gönder',
    close: 'Kapat',
    edit: 'Düzenle',
    delete: 'Sil',
    search: 'Ara',
    
    // Navigation
    home: 'Ana Sayfa',
    dashboard: 'Gösterge Paneli',
    profile: 'Profil',
    settings: 'Ayarlar',
    notifications: 'Bildirimler',
    
    // Authentication
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    email: 'E-posta',
    password: 'Şifre',
    forgotPassword: 'Şifremi Unuttum?',
    welcomeBack: 'Tekrar Hoş Geldiniz',
    
    // Assessment
    personalityInventory: 'Kişilik Envanteri',
    expertiseInventory: 'Uzmanlık Envanteri',
    roleAssignment: 'Rol Ataması',
    startAssessment: 'Değerlendirmeyi Başlat',
    completeAssessment: 'Değerlendirmeyi Tamamla',
    assessmentProgress: 'Değerlendirme İlerlemesi',
    
    // Simulation
    simulationGame: 'Simülasyon Oyunu',
    simulationComplete: 'Simülasyon Tamamlandı',
    startSimulation: 'Simülasyonu Başlat',
    simulationDay: 'Gün',
    simulationScore: 'Puan',
    
    // Career Tools
    cvGenerator: 'CV Oluşturucu',
    jobBoard: 'İş İlanları',
    jobApplication: 'İş Başvurusu',
    interviewPrep: 'Mülakat Hazırlığı',
    networking: 'Ağ Kurma',
    coaching: 'Koçluk',
    
    // Packages
    free: 'Ücretsiz',
    core: 'Temel',
    pro: 'Pro',
    premium: 'Premium',
    upgrade: 'Yükselt',
    subscription: 'Abonelik',
    payment: 'Ödeme',
    
    // User Profile
    name: 'Ad',
    profession: 'Meslek',
    personalityType: 'Kişilik Tipi',
    expertiseLevel: 'Uzmanlık Seviyesi',
    assignedRole: 'Atanan Rol',
    competencies: 'Yeterlilikler',
    weaknesses: 'Zayıf Yönler',
    
    // Questions
    socialBehavior: 'Sosyal ortamlarda nasıl davranırsınız?',
    decisionMaking: 'Karar verirken hangi yaklaşımı benimsersiniz?',
    stressResponse: 'Stresli durumlarda nasıl tepki verirsiniz?',
    leadershipExperience: 'Liderlik deneyiminizi nasıl değerlendirirsiniz?',
    problemSolving: 'Problem çözme becerileriniz hangi seviyede?',
    communicationSkills: 'İletişim becerilerinizi nasıl tanımlarsınız?',
    
    // Options
    activeParticipation: 'Aktif olarak konuşmalara katılırım',
    preferListening: 'Dinlemeyi tercih ederim',
    smallGroupChat: 'Küçük gruplarla sohbet ederim',
    stayObservant: 'Gözlemci kalırım',
    quickIntuitive: 'Hızlı ve sezgisel kararlar veririm',
    detailedAnalysis: 'Detaylı analiz yaparım',
    seekOthersOpinion: 'Başkalarının görüşlerini alırım',
    relyOnExperience: 'Deneyimlerime dayanırım',
    stayCalm: 'Sakin kalır, çözüm ararım',
    takeAction: 'Hemen harekete geçerim',
    seekSupport: 'Destek ararım',
    analyzeSituation: 'Durumu analiz ederim',
    noExperience: 'Hiç deneyimim yok',
    smallProjectLeadership: 'Küçük projelerde liderlik yaptım',
    mediumTeamManagement: 'Orta ölçekli takımları yönettim',
    largeOrganizationLeadership: 'Büyük organizasyonlarda liderlik deneyimim var',
    basicLevel: 'Temel seviye',
    intermediateLevel: 'Orta seviye',
    advancedLevel: 'İleri seviye',
    expertLevel: 'Uzman seviye',
    needsImprovement: 'Geliştirilmesi gereken',
    adequate: 'Yeterli',
    good: 'İyi',
    excellent: 'Mükemmel',
    
    // Messages
    welcomeMessage: 'Kariyer Keşfi\'ne Hoş Geldiniz',
    assessmentComplete: 'Değerlendirme başarıyla tamamlandı!',
    simulationCompleteMessage: 'Simülasyon tamamlandı!',
    profileUpdated: 'Profil başarıyla güncellendi!',
    paymentSuccessful: 'Ödeme başarılı!',
  }
}

export function useTranslation(language: Language) {
  return {
    t: (key: keyof Translations) => translations[language][key],
    language,
  }
} 