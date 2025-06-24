"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  CheckCircle,
  Users,
  Leaf,
  Briefcase,
  Home,
  Bell,
  User,
  Crown,
  Play,
  FileText,
  Lock,
  Star,
  MessageCircle,
  Target,
  LayoutDashboard,
  Award,
  Send,
  Settings,
  BarChart3,
  Activity,
  Globe,
} from "lucide-react"
import { useTranslation, type Language } from "@/lib/i18n"

type Screen =
  | "signin"
  | "home"
  | "dashboard"
  | "personality-inventory"
  | "expertise-inventory"
  | "role-assignment"
  | "simulation-game"
  | "simulation-complete"
  | "ai-report"
  | "cv-generator"
  | "job-board"
  | "job-application"
  | "interview-prep"
  | "networking"
  | "notifications"
  | "profile"
  | "payment"
  | "subscription"
  | "coaching"

type PackageType = "free" | "core" | "pro" | "premium"

type UserProfile = {
  name: string
  email: string
  profession: string
  personalityType: string
  expertiseLevel: string
  assignedRole: string
  completedAssessments: string[]
  simulationProgress: number
  simulationDay: number
  competencies: string[]
  weaknesses: string[]
  currentPackage: PackageType
  packageExpiry?: string
  coachingSessionsLeft: number
  cvGenerated: boolean
  jobApplications: number
  networkConnections: number
  interviewsPracticed: number
  notificationsCount: number
}

type JobPosting = {
  id: string
  title: string
  company: string
  location: string
  salary: string
  match: number
  description: string
  requirements: string[]
  posted: string
  type: "full-time" | "part-time" | "contract"
  applied: boolean
}

type Notification = {
  id: string
  type: "job" | "education" | "network" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

type SimulationScenario = {
  id: number
  day: number
  title: string
  scenario: string
  options: string[]
  correctAnswer: number
  competency: string
  difficulty: "easy" | "medium" | "hard"
}

export default function TrailieApp() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>("signin")
  const [language, setLanguage] = React.useState<Language>('tr')
  const { t } = useTranslation(language)
  const [userProfile, setUserProfile] = React.useState<UserProfile>({
    name: "",
    email: "",
    profession: "",
    personalityType: "",
    expertiseLevel: "",
    assignedRole: "",
    completedAssessments: [],
    simulationProgress: 0,
    simulationDay: 1,
    competencies: [],
    weaknesses: [],
    currentPackage: "free",
    coachingSessionsLeft: 0,
    cvGenerated: false,
    jobApplications: 0,
    networkConnections: 0,
    interviewsPracticed: 0,
    notificationsCount: 3,
  })

  const [currentStep, setCurrentStep] = React.useState(1)
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, string>>({})
  const [selectedPackage, setSelectedPackage] = React.useState<PackageType>("core")
  const [simulationScore, setSimulationScore] = React.useState(0)
  const [selectedJob, setSelectedJob] = React.useState<JobPosting | null>(null)

  // Sample data
  const personalityQuestions = [
    {
      id: 1,
      question: "Sosyal ortamlarda nasıl davranırsınız?",
      options: [
        "Aktif olarak konuşmalara katılırım",
        "Dinlemeyi tercih ederim",
        "Küçük gruplarla sohbet ederim",
        "Gözlemci kalırım",
      ],
    },
    {
      id: 2,
      question: "Karar verirken hangi yaklaşımı benimsersiniz?",
      options: [
        "Hızlı ve sezgisel kararlar veririm",
        "Detaylı analiz yaparım",
        "Başkalarının görüşlerini alırım",
        "Deneyimlerime dayanırım",
      ],
    },
    {
      id: 3,
      question: "Stresli durumlarda nasıl tepki verirsiniz?",
      options: ["Sakin kalır, çözüm ararım", "Hemen harekete geçerim", "Destek ararım", "Durumu analiz ederim"],
    },
  ]

  const expertiseQuestions = [
    {
      id: 1,
      question: "Liderlik deneyiminizi nasıl değerlendirirsiniz?",
      options: [
        "Hiç deneyimim yok",
        "Küçük projelerde liderlik yaptım",
        "Orta ölçekli takımları yönettim",
        "Büyük organizasyonlarda liderlik deneyimim var",
      ],
    },
    {
      id: 2,
      question: "Problem çözme becerileriniz hangi seviyede?",
      options: ["Temel seviye", "Orta seviye", "İleri seviye", "Uzman seviye"],
    },
    {
      id: 3,
      question: "İletişim becerilerinizi nasıl tanımlarsınız?",
      options: ["Geliştirilmesi gereken", "Yeterli", "İyi", "Mükemmel"],
    },
  ]

  const simulationScenarios: SimulationScenario[] = [
    {
      id: 1,
      day: 1,
      title: "İlk Gün Tanışma",
      scenario:
        "Yeni işinizin ilk günü. Takım lideri sizi ekiple tanıştırıyor ve ilk projenizi açıklıyor. Nasıl bir yaklaşım sergiliyorsunuz?",
      options: [
        "Hemen sorular sorarak projeyi detaylı öğrenmeye çalışırım",
        "Önce dinler, sonra kendi fikirlerimi paylaşırım",
        "Takım arkadaşlarımla tanışmaya odaklanırım",
        "Mevcut süreçleri gözlemleyerek öğrenmeye başlarım",
      ],
      correctAnswer: 1,
      competency: "Adaptasyon",
      difficulty: "easy",
    },
    {
      id: 2,
      day: 15,
      title: "İlk Proje Zorluğu",
      scenario:
        "İlk projenizde beklenmedik bir teknik sorunla karşılaştınız. Deadline yaklaşıyor ve çözüm bulamıyorsunuz. Ne yaparsınız?",
      options: [
        "Sorunu tek başıma çözmeye devam ederim",
        "Hemen yöneticime durumu bildiririm",
        "Takım arkadaşlarımdan yardım isterim",
        "Alternatif çözüm yolları araştırırım",
      ],
      correctAnswer: 2,
      competency: "Problem Çözme",
      difficulty: "medium",
    },
    {
      id: 3,
      day: 30,
      title: "Takım Çatışması",
      scenario:
        "İki takım arkadaşınız arasında bir anlaşmazlık var ve bu durum projeyi etkiliyor. Arabuluculuk yapmanız isteniyor. Yaklaşımınız nedir?",
      options: [
        "Her iki tarafı da dinler, ortak çözüm ararım",
        "Duruma müdahale etmem, kendileri çözsinler",
        "Yöneticiye durumu bildiririm",
        "Daha deneyimli bir meslektaştan tavsiye alırım",
      ],
      correctAnswer: 0,
      competency: "İletişim",
      difficulty: "hard",
    },
  ]

  const jobPostings: JobPosting[] = [
    {
      id: "1",
      title: "Junior Frontend Developer",
      company: "TechStart A.Ş.",
      location: "İstanbul, Türkiye",
      salary: "₺15.000 - ₺20.000",
      match: 92,
      description: "React ve TypeScript deneyimi olan junior developer aranıyor.",
      requirements: ["React", "TypeScript", "HTML/CSS", "Git"],
      posted: "2 gün önce",
      type: "full-time",
      applied: false,
    },
    {
      id: "2",
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Ankara, Türkiye",
      salary: "₺18.000 - ₺25.000",
      match: 87,
      description: "Kullanıcı deneyimi odaklı tasarım yapabilecek designer aranıyor.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      posted: "1 hafta önce",
      type: "full-time",
      applied: false,
    },
    {
      id: "3",
      title: "Project Manager",
      company: "Global Corp",
      location: "İzmir, Türkiye",
      salary: "₺25.000 - ₺35.000",
      match: 78,
      description: "Agile metodolojiler konusunda deneyimli proje yöneticisi aranıyor.",
      requirements: ["Scrum", "Jira", "Leadership", "Communication"],
      posted: "3 gün önce",
      type: "full-time",
      applied: true,
    },
  ]

  const notifications: Notification[] = [
    {
      id: "1",
      type: "job",
      title: "Yeni İş Fırsatı",
      message: "Profilinize uygun 3 yeni iş ilanı bulundu",
      timestamp: "2 saat önce",
      read: false,
      actionUrl: "job-board",
    },
    {
      id: "2",
      type: "education",
      title: "Önerilen Kurs",
      message: "React Advanced Patterns kursu sizin için öneriliyor",
      timestamp: "1 gün önce",
      read: false,
    },
    {
      id: "3",
      type: "network",
      title: "Yeni Bağlantı",
      message: "Ahmet Yılmaz bağlantı isteği gönderdi",
      timestamp: "3 gün önce",
      read: true,
    },
  ]

  const hasAccess = (feature: string): boolean => {
    const packageFeatures: Record<PackageType, string[]> = {
      free: ["personality-inventory", "ai-report"],
      core: ["personality-inventory", "expertise-inventory", "simulation-game", "cv-generator", "ai-report"],
      pro: ["personality-inventory", "expertise-inventory", "simulation-game", "cv-generator", "ai-report", "job-board", "interview-prep"],
      premium: ["personality-inventory", "expertise-inventory", "simulation-game", "cv-generator", "ai-report", "job-board", "interview-prep", "networking", "coaching"],
    }

    const currentPackage = userProfile.currentPackage as PackageType
    const currentPackageFeatures = packageFeatures[currentPackage]
    return currentPackageFeatures ? currentPackageFeatures.includes(feature) : false
  }

  const renderHeader = () => {
    if (currentScreen === "signin") return null

    return (
      <div className="bg-white border-b px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("home")}
              className={`flex items-center space-x-2 ${currentScreen === "home" ? "bg-teal-50 text-teal-700" : ""}`}
            >
              <Home className="w-4 h-4" />
              <span>{t('home')}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("dashboard")}
              className={`flex items-center space-x-2 ${currentScreen === "dashboard" ? "bg-blue-50 text-blue-700" : ""}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('dashboard')}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={language === 'tr' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('tr')}
                className="text-xs h-7 px-2"
              >
                TR
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="text-xs h-7 px-2"
              >
                EN
              </Button>
            </div>
            
            <Badge
              className={`${
                userProfile.currentPackage === "free"
                  ? "bg-gray-100 text-gray-800"
                  : userProfile.currentPackage === "core"
                    ? "bg-blue-100 text-blue-800"
                    : userProfile.currentPackage === "pro"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-amber-100 text-amber-800"
              }`}
            >
              {t(userProfile.currentPackage)}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("notifications")} className="relative">
              <Bell className="w-4 h-4" />
              {userProfile.notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {userProfile.notificationsCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("subscription")}>
              <Crown className="w-4 h-4 text-amber-600" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("home")}
              className={`${currentScreen === "home" ? "bg-teal-50 text-teal-700" : ""}`}
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("dashboard")}
              className={`${currentScreen === "dashboard" ? "bg-blue-50 text-blue-700" : ""}`}
            >
              <LayoutDashboard className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-1">
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={language === 'tr' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('tr')}
                className="text-xs h-6 px-1"
              >
                TR
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="text-xs h-6 px-1"
              >
                EN
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("notifications")} className="relative">
              <Bell className="w-4 h-4" />
              {userProfile.notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[10px]">
                  {userProfile.notificationsCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderSignInScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-sm space-y-6 md:space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Leaf className="w-10 h-10 md:w-12 md:h-12 text-teal-600" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t('welcomeMessage')}</h1>
          <p className="text-sm md:text-base text-gray-600">AI destekli kariyer rehberliği ile potansiyelinizi keşfedin</p>
        </div>

        <Card>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setUserProfile({ ...userProfile, name: "Umut Çakıroğlu", email: "umut@example.com" })
                  setCurrentScreen("home")
                }}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google ile {t('signIn')}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setUserProfile({ ...userProfile, name: "Umut Çakıroğlu", email: "umut@example.com" })
                  setCurrentScreen("home")
                }}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="#0077B5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn ile {t('signIn')}
              </Button>
            </div>

            <div className="text-center text-gray-500 text-sm">— Veya —</div>

            <div className="space-y-3">
              <Input placeholder={t('email')} type="email" />
              <Input placeholder={t('password')} type="password" />
            </div>

            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => {
                setUserProfile({ ...userProfile, name: "Umut Çakıroğlu", email: "umut@example.com" })
                setCurrentScreen("home")
              }}
            >
              {t('signIn')}
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm text-teal-600">
                Hesabınız yok mu? {t('signUp')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-2xl font-bold">Hoş geldiniz, {userProfile.name || "Kullanıcı"}!</h1>
          <p className="text-sm md:text-base text-gray-600">Kariyer yolculuğunuza başlayın</p>
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
              <span>Başlangıç Rehberi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    userProfile.completedAssessments.includes("personality")
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className={`text-sm md:text-base ${userProfile.completedAssessments.includes("personality") ? "line-through" : ""}`}>
                  {t('personalityInventory')} tamamlayın ({t('free')})
                </span>
                {userProfile.completedAssessments.includes("personality") && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    userProfile.completedAssessments.includes("expertise")
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className={`text-sm md:text-base ${userProfile.completedAssessments.includes("expertise") ? "line-through" : ""}`}>
                  {t('expertiseInventory')} tamamlayın (Ücretli)
                </span>
                {userProfile.completedAssessments.includes("expertise") && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    userProfile.simulationProgress > 0 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className={userProfile.simulationProgress > 0 ? "line-through" : ""}>
                  100 Günlük Simülasyonu başlatın
                </span>
                {userProfile.simulationProgress > 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    userProfile.cvGenerated ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  4
                </div>
                <span className={userProfile.cvGenerated ? "line-through" : ""}>CV'nizi oluşturun</span>
                {userProfile.cvGenerated && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 1: Personality Inventory (Free) */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 border-teal-200"
            onClick={() => setCurrentScreen("personality-inventory")}
          >
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">1. Kişilik Envanteri</h3>
              <p className="text-sm text-gray-600 mb-3">Kişilik özelliklerinizi keşfedin</p>
              <Badge className="bg-green-100 text-green-800 mb-2">Ücretsiz</Badge>
              {userProfile.completedAssessments.includes("personality") && (
                <div className="flex items-center justify-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Tamamlandı</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Expertise Inventory (Paid) */}
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${
              hasAccess("expertise") ? "border-blue-200" : "border-gray-200 opacity-75"
            }`}
            onClick={() => {
              if (!hasAccess("expertise")) {
                setCurrentScreen("subscription")
              } else {
                setCurrentScreen("expertise-inventory")
              }
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="relative">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                {!hasAccess("expertise") && <Lock className="w-6 h-6 text-gray-400 absolute top-0 right-6" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Uzmanlık Envanteri</h3>
              <p className="text-sm text-gray-600 mb-3">AI destekli rol eşlemesi</p>
              <Badge className={hasAccess("expertise") ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                {hasAccess("expertise") ? "Erişilebilir" : "Core Paketi Gerekli"}
              </Badge>
              {userProfile.completedAssessments.includes("expertise") && (
                <div className="flex items-center justify-center space-x-1 text-green-600 mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Tamamlandı</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Job Simulation */}
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${
              hasAccess("simulation") ? "border-purple-200" : "border-gray-200 opacity-75"
            }`}
            onClick={() => {
              if (!hasAccess("simulation")) {
                setCurrentScreen("subscription")
              } else if (userProfile.assignedRole) {
                setCurrentScreen("simulation-game")
              } else {
                setCurrentScreen("role-assignment")
              }
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="relative">
                <Play className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                {!hasAccess("simulation") && <Lock className="w-6 h-6 text-gray-400 absolute top-0 right-6" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">3. İş Simülasyonu</h3>
              <p className="text-sm text-gray-600 mb-3">100 günlük deneyim</p>
              <Badge
                className={hasAccess("simulation") ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}
              >
                {hasAccess("simulation") ? "Erişilebilir" : "Core Paketi Gerekli"}
              </Badge>
              {userProfile.simulationProgress > 0 && (
                <div className="mt-2">
                  <Progress value={userProfile.simulationProgress} className="mb-1" />
                  <span className="text-xs text-gray-600">{userProfile.simulationDay}/100 gün</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 4: CV Generator */}
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${
              hasAccess("cv-generator") ? "border-indigo-200" : "border-gray-200 opacity-75"
            }`}
            onClick={() => {
              if (!hasAccess("cv-generator")) {
                setCurrentScreen("subscription")
              } else {
                setCurrentScreen("cv-generator")
              }
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="relative">
                <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                {!hasAccess("cv-generator") && <Lock className="w-6 h-6 text-gray-400 absolute top-0 right-6" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">4. CV Oluşturucu</h3>
              <p className="text-sm text-gray-600 mb-3">AI destekli CV hazırlama</p>
              <Badge
                className={hasAccess("cv-generator") ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"}
              >
                {hasAccess("cv-generator") ? "Erişilebilir" : "Core Paketi Gerekli"}
              </Badge>
              {userProfile.cvGenerated && (
                <div className="flex items-center justify-center space-x-1 text-green-600 mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">CV Oluşturuldu</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 5: Job Board */}
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${
              hasAccess("job-board-basic") || hasAccess("job-board-advanced")
                ? "border-red-200"
                : "border-gray-200 opacity-75"
            }`}
            onClick={() => {
              if (!hasAccess("job-board-basic") && !hasAccess("job-board-advanced")) {
                setCurrentScreen("subscription")
              } else {
                setCurrentScreen("job-board")
              }
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="relative">
                <Briefcase className="w-12 h-12 text-red-600 mx-auto mb-4" />
                {!hasAccess("job-board-basic") && !hasAccess("job-board-advanced") && (
                  <Lock className="w-6 h-6 text-gray-400 absolute top-0 right-6" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">5. İş İlanları</h3>
              <p className="text-sm text-gray-600 mb-3">AI eşleşmeli iş fırsatları</p>
              <Badge
                className={
                  hasAccess("job-board-advanced")
                    ? "bg-red-100 text-red-800"
                    : hasAccess("job-board-basic")
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-800"
                }
              >
                {hasAccess("job-board-advanced")
                  ? "Gelişmiş"
                  : hasAccess("job-board-basic")
                    ? "Temel"
                    : "Core Paketi Gerekli"}
              </Badge>
              {userProfile.jobApplications > 0 && (
                <div className="text-xs text-gray-600 mt-2">{userProfile.jobApplications} başvuru yapıldı</div>
              )}
            </CardContent>
          </Card>

          {/* Step 6: Interview Prep (Free) */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 border-green-200"
            onClick={() => setCurrentScreen("interview-prep")}
          >
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">6. Mülakat Hazırlık</h3>
              <p className="text-sm text-gray-600 mb-3">AI destekli mülakat pratiği</p>
              <Badge className="bg-green-100 text-green-800">Ücretsiz</Badge>
              {userProfile.interviewsPracticed > 0 && (
                <div className="text-xs text-gray-600 mt-2">{userProfile.interviewsPracticed} mülakat pratiği</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentScreen("networking")}
          >
            <CardContent className="p-6 text-center">
              <Users className="w-10 h-10 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Network Modülü</h3>
              <p className="text-sm text-gray-600">Kariyer odaklı networking</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Ücretsiz</Badge>
              {userProfile.networkConnections > 0 && (
                <div className="text-xs text-gray-600 mt-2">{userProfile.networkConnections} bağlantı</div>
              )}
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentScreen("ai-report")}
          >
            <CardContent className="p-6 text-center">
              <Star className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI Karne & Eğitim</h3>
              <p className="text-sm text-gray-600">Kişiselleştirilmiş gelişim önerileri</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Ücretsiz</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Tüm modüllerinizi ve ilerlemenizi takip edin</p>
          </div>
          <Button onClick={() => setCurrentScreen("profile")} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Profil Ayarları
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.completedAssessments.length}/2</div>
              <div className="text-sm text-gray-600">Tamamlanan Test</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.simulationProgress}%</div>
              <div className="text-sm text-gray-600">Simülasyon İlerlemesi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Send className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.jobApplications}</div>
              <div className="text-sm text-gray-600">İş Başvurusu</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.networkConnections}</div>
              <div className="text-sm text-gray-600">Network Bağlantısı</div>
            </CardContent>
          </Card>
        </div>

        {/* Module Status */}
        <Card>
          <CardHeader>
            <CardTitle>Modül Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Kişilik Envanteri",
                  status: userProfile.completedAssessments.includes("personality") ? "completed" : "available",
                  action: () => setCurrentScreen("personality-inventory"),
                  icon: User,
                  color: "text-teal-600",
                },
                {
                  name: "Uzmanlık Envanteri",
                  status: userProfile.completedAssessments.includes("expertise")
                    ? "completed"
                    : hasAccess("expertise")
                      ? "available"
                      : "locked",
                  action: () =>
                    hasAccess("expertise") ? setCurrentScreen("expertise-inventory") : setCurrentScreen("subscription"),
                  icon: Target,
                  color: "text-blue-600",
                },
                {
                  name: "İş Simülasyonu",
                  status:
                    userProfile.simulationProgress > 0
                      ? "in-progress"
                      : hasAccess("simulation")
                        ? "available"
                        : "locked",
                  action: () =>
                    hasAccess("simulation")
                      ? userProfile.assignedRole
                        ? setCurrentScreen("simulation-game")
                        : setCurrentScreen("role-assignment")
                      : setCurrentScreen("subscription"),
                  icon: Play,
                  color: "text-purple-600",
                },
                {
                  name: "CV Oluşturucu",
                  status: userProfile.cvGenerated ? "completed" : hasAccess("cv-generator") ? "available" : "locked",
                  action: () =>
                    hasAccess("cv-generator") ? setCurrentScreen("cv-generator") : setCurrentScreen("subscription"),
                  icon: FileText,
                  color: "text-indigo-600",
                },
                {
                  name: "İş İlanları",
                  status:
                    userProfile.jobApplications > 0
                      ? "active"
                      : hasAccess("job-board-basic") || hasAccess("job-board-advanced")
                        ? "available"
                        : "locked",
                  action: () =>
                    hasAccess("job-board-basic") || hasAccess("job-board-advanced")
                      ? setCurrentScreen("job-board")
                      : setCurrentScreen("subscription"),
                  icon: Briefcase,
                  color: "text-red-600",
                },
                {
                  name: "Mülakat Hazırlık",
                  status: "available",
                  action: () => setCurrentScreen("interview-prep"),
                  icon: MessageCircle,
                  color: "text-green-600",
                },
                {
                  name: "Network Modülü",
                  status: userProfile.networkConnections > 0 ? "active" : "available",
                  action: () => setCurrentScreen("networking"),
                  icon: Users,
                  color: "text-pink-600",
                },
              ].map((module, index) => {
                const Icon = module.icon
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${module.color}`} />
                      <div>
                        <h4 className="font-medium">{module.name}</h4>
                        <div className="flex items-center space-x-2">
                          {module.status === "completed" && (
                            <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>
                          )}
                          {module.status === "in-progress" && (
                            <Badge className="bg-blue-100 text-blue-800">Devam Ediyor</Badge>
                          )}
                          {module.status === "active" && <Badge className="bg-purple-100 text-purple-800">Aktif</Badge>}
                          {module.status === "available" && (
                            <Badge className="bg-gray-100 text-gray-800">Kullanılabilir</Badge>
                          )}
                          {module.status === "locked" && <Badge className="bg-red-100 text-red-800">Kilitli</Badge>}
                        </div>
                      </div>
                    </div>
                    <Button onClick={module.action} size="sm">
                      {module.status === "locked" ? "Yükselt" : "Aç"}
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  action: "Kişilik Envanteri tamamlandı",
                  time: "2 gün önce",
                  icon: CheckCircle,
                  color: "text-green-600",
                },
                {
                  action: "Yeni iş ilanı eşleşmesi",
                  time: "1 hafta önce",
                  icon: Briefcase,
                  color: "text-blue-600",
                },
                {
                  action: "Network bağlantısı eklendi",
                  time: "2 hafta önce",
                  icon: Users,
                  color: "text-pink-600",
                },
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPersonalityInventory = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Kişilik Envanteri</h1>
          <p className="text-gray-600">Kişilik özelliklerinizi keşfetmek için sorulara yanıt verin</p>
          <Badge className="bg-green-100 text-green-800">Ücretsiz</Badge>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Soru {currentStep} / {personalityQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / personalityQuestions.length) * 100)}%
            </span>
          </div>
          <Progress value={(currentStep / personalityQuestions.length) * 100} />
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">{personalityQuestions[currentStep - 1]?.question}</h2>

            <div className="space-y-3">
              {personalityQuestions[currentStep - 1]?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[`personality_${currentStep}`] === option ? "default" : "outline"}
                  className={`w-full h-auto p-4 text-left justify-start ${
                    selectedAnswers[`personality_${currentStep}`] === option ? "bg-teal-600 hover:bg-teal-700" : ""
                  }`}
                  onClick={() => setSelectedAnswers({ ...selectedAnswers, [`personality_${currentStep}`]: option })}
                >
                  {option}
                </Button>
              ))}
            </div>

            {selectedAnswers[`personality_${currentStep}`] && (
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Önceki
                  </Button>
                )}
                <Button
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    if (currentStep < personalityQuestions.length) {
                      setCurrentStep(currentStep + 1)
                    } else {
                      setUserProfile({
                        ...userProfile,
                        personalityType: "Analitik Düşünür",
                        completedAssessments: [...userProfile.completedAssessments, "personality"],
                        competencies: ["Analitik Düşünme", "Problem Çözme", "Detay Odaklılık"],
                      })
                      setCurrentStep(1)
                      setCurrentScreen("home")
                    }
                  }}
                >
                  {currentStep < personalityQuestions.length ? "Devam" : "Tamamla"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderExpertiseInventory = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Uzmanlık Envanteri</h1>
          <p className="text-gray-600">Profesyonel becerilerinizi değerlendirin</p>
          <Badge className="bg-blue-100 text-blue-800">Core Paketi</Badge>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Soru {currentStep} / {expertiseQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / expertiseQuestions.length) * 100)}%
            </span>
          </div>
          <Progress value={(currentStep / expertiseQuestions.length) * 100} />
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">{expertiseQuestions[currentStep - 1]?.question}</h2>

            <div className="space-y-3">
              {expertiseQuestions[currentStep - 1]?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[`expertise_${currentStep}`] === option ? "default" : "outline"}
                  className={`w-full h-auto p-4 text-left justify-start ${
                    selectedAnswers[`expertise_${currentStep}`] === option ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => setSelectedAnswers({ ...selectedAnswers, [`expertise_${currentStep}`]: option })}
                >
                  {option}
                </Button>
              ))}
            </div>

            {selectedAnswers[`expertise_${currentStep}`] && (
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Önceki
                  </Button>
                )}
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (currentStep < expertiseQuestions.length) {
                      setCurrentStep(currentStep + 1)
                    } else {
                      setUserProfile({
                        ...userProfile,
                        expertiseLevel: "Orta Seviye",
                        assignedRole: "Frontend Developer",
                        completedAssessments: [...userProfile.completedAssessments, "expertise"],
                        competencies: [...userProfile.competencies, "Liderlik", "İletişim", "Teknik Beceriler"],
                        weaknesses: ["Zaman Yönetimi", "Sunum Becerileri"],
                      })
                      setCurrentStep(1)
                      setCurrentScreen("role-assignment")
                    }
                  }}
                >
                  {currentStep < expertiseQuestions.length ? "Devam" : "Tamamla"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRoleAssignment = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Award className="w-12 h-12 text-purple-600 mx-auto" />
          <h1 className="text-2xl font-bold">Rol Ataması Tamamlandı!</h1>
          <p className="text-gray-600">AI analiziniz sonucunda size en uygun rol belirlendi</p>
        </div>

        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-600">{userProfile.assignedRole}</div>
              <p className="text-gray-600">
                Kişilik ve uzmanlık analiziniz sonucunda bu rol sizin için en uygun seçenek olarak belirlendi.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-green-100 text-green-800">%92 Uyumluluk</Badge>
                <Badge className="bg-blue-100 text-blue-800">Orta Seviye</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Güçlü Yönleriniz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userProfile.competencies.map((competency, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{competency}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gelişim Alanları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userProfile.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span className="text-sm">{weakness}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>100 Günlük İş Simülasyonu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Şimdi {userProfile.assignedRole} rolünde 100 günlük bir simülasyon deneyimi yaşayacaksınız. Bu süreçte
              gerçek iş senaryolarıyla karşılaşacak ve kararlarınız AI tarafından analiz edilecek.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Simülasyonda Neler Olacak?</h4>
              <ul className="space-y-1 text-sm">
                <li>• Günlük iş senaryoları ve karar alma durumları</li>
                <li>• Takım çalışması ve liderlik deneyimleri</li>
                <li>• Problem çözme ve kriz yönetimi</li>
                <li>• Performans değerlendirme ve geri bildirim</li>
              </ul>
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {
                setUserProfile({
                  ...userProfile,
                  simulationProgress: 1,
                  simulationDay: 1,
                })
                setCurrentScreen("simulation-game")
              }}
            >
              Simülasyonu Başlat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSimulationGame = () => {
    const currentScenario = simulationScenarios.find((s) => s.day === userProfile.simulationDay)
    if (!currentScenario) return null

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {currentScenario.day}. Gün
              </Badge>
              <div className="text-sm text-gray-600">
                Skor: {simulationScore}/{userProfile.simulationDay - 1}
              </div>
            </div>
            <Progress value={(userProfile.simulationDay / 100) * 100} className="mb-2" />
            <div className="text-xs text-gray-500 text-center">{userProfile.simulationDay}/100 gün</div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-purple-600" />
                <span>{currentScenario.title}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Badge className="bg-blue-100 text-blue-800">{currentScenario.competency}</Badge>
                <Badge
                  variant="outline"
                  className={
                    currentScenario.difficulty === "easy"
                      ? "border-green-200 text-green-800"
                      : currentScenario.difficulty === "medium"
                        ? "border-yellow-200 text-yellow-800"
                        : "border-red-200 text-red-800"
                  }
                >
                  {currentScenario.difficulty === "easy"
                    ? "Kolay"
                    : currentScenario.difficulty === "medium"
                      ? "Orta"
                      : "Zor"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">{currentScenario.scenario}</p>

              <div className="space-y-3">
                {currentScenario.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedAnswers[`simulation_${currentScenario.day}`] === index.toString() ? "default" : "outline"
                    }
                    className={`w-full h-auto p-4 text-left justify-start ${
                      selectedAnswers[`simulation_${currentScenario.day}`] === index.toString()
                        ? "bg-purple-600 hover:bg-purple-700"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedAnswers({
                        ...selectedAnswers,
                        [`simulation_${currentScenario.day}`]: index.toString(),
                      })
                    }
                  >
                    <span className="text-sm">{option}</span>
                  </Button>
                ))}
              </div>

              {selectedAnswers[`simulation_${currentScenario.day}`] && (
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    const selectedIndex = Number.parseInt(selectedAnswers[`simulation_${currentScenario.day}`])
                    const isCorrect = selectedIndex === currentScenario.correctAnswer
                    const newScore = simulationScore + (isCorrect ? 1 : 0)

                    if (userProfile.simulationDay >= 100) {
                      setUserProfile({
                        ...userProfile,
                        simulationProgress: 100,
                      })
                      setSimulationScore(newScore)
                      setCurrentScreen("simulation-complete")
                    } else {
                      setUserProfile({
                        ...userProfile,
                        simulationDay: userProfile.simulationDay + 1,
                        simulationProgress: ((userProfile.simulationDay + 1) / 100) * 100,
                      })
                      setSimulationScore(newScore)
                    }
                  }}
                >
                  {userProfile.simulationDay >= 100 ? "Simülasyonu Tamamla" : "Sonraki Gün"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderSimulationComplete = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Award className="w-16 h-16 text-gold-600 mx-auto" />
          <h1 className="text-3xl font-bold">Tebrikler! Simülasyonu Tamamladınız</h1>
          <p className="text-gray-600">100 günlük iş deneyiminiz başarıyla tamamlandı</p>
        </div>

        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-green-600">{simulationScore}/100</div>
              <p className="text-xl font-semibold">Genel Performans Puanınız</p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  {simulationScore >= 80 ? "Mükemmel" : simulationScore >= 60 ? "İyi" : "Geliştirilmeli"}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">{userProfile.assignedRole}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setCurrentScreen("ai-report")}>
            Detaylı AI Raporunu Görüntüle
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCVGenerator = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <FileText className="w-12 h-12 text-indigo-600 mx-auto" />
          <h1 className="text-2xl font-bold">AI CV Oluşturucu</h1>
          <p className="text-gray-600">Simülasyon sonuçlarınıza dayalı kişiselleştirilmiş CV</p>
          <Badge className="bg-indigo-100 text-indigo-800">Core Paketi</Badge>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">CV'niz Hazırlanıyor...</h3>
              <p className="text-gray-600">
                AI, simülasyon performansınızı, kişilik özelliklerinizi ve uzmanlık seviyenizi analiz ederek size özel
                bir CV hazırlıyor.
              </p>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  setUserProfile({ ...userProfile, cvGenerated: true })
                  setCurrentScreen("job-board")
                }}
              >
                CV'mi Oluştur ve İş İlanlarını Gör
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderJobBoard = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Briefcase className="w-12 h-12 text-red-600 mx-auto" />
          <h1 className="text-2xl font-bold">AI Eşleşmeli İş İlanları</h1>
          <p className="text-gray-600">Profilinize uygun iş fırsatları</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {jobPostings.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{job.match}% Uyum</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Maaş: {job.salary}</p>
                    <p className="text-sm text-gray-600">{job.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{job.posted}</span>
                    <Button
                      size="sm"
                      disabled={job.applied}
                      onClick={() => {
                        setSelectedJob(job)
                        setCurrentScreen("job-application")
                      }}
                      className={job.applied ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}
                    >
                      {job.applied ? "Başvuruldu" : "Başvur"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderJobApplication = () => {
    if (!selectedJob) return null

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Send className="w-12 h-12 text-blue-600 mx-auto" />
            <h1 className="text-2xl font-bold">İş Başvurusu</h1>
            <p className="text-gray-600">{selectedJob.title} pozisyonu için başvuru</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{selectedJob.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedJob.company} - {selectedJob.location}
                </p>
                <Badge className="bg-green-100 text-green-800">{selectedJob.match}% Uyum</Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Kapak Mektubu</label>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows={6}
                    placeholder="AI tarafından önerilen kapak mektubunuz burada görünecek..."
                    defaultValue={`Sayın İnsan Kaynakları Ekibi,

${selectedJob.title} pozisyonu için başvuruda bulunmak istiyorum. Trailie simülasyonunda ${userProfile.assignedRole} rolünde gösterdiğim performans ve ${userProfile.competencies.join(", ")} alanlarındaki yetkinliklerim bu pozisyon için uygun olduğumu göstermektedir.

Simülasyon sürecinde ${simulationScore}/100 puan alarak başarılı bir performans sergiledim. Özellikle ${userProfile.competencies[0]} konusundaki deneyimim bu rol için değerli olacaktır.

Görüşme fırsatı için teşekkür ederim.

Saygılarımla,
${userProfile.name}`}
                  />
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setUserProfile({
                    ...userProfile,
                    jobApplications: userProfile.jobApplications + 1,
                  })
                  // Mark job as applied
                  const updatedJob = { ...selectedJob, applied: true }
                  setSelectedJob(updatedJob)
                  setCurrentScreen("job-board")
                }}
              >
                Başvuruyu Gönder
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderInterviewPrep = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <MessageCircle className="w-12 h-12 text-green-600 mx-auto" />
          <h1 className="text-2xl font-bold">AI Mülakat Hazırlık</h1>
          <p className="text-gray-600">Kişiselleştirilmiş mülakat pratiği</p>
          <Badge className="bg-green-100 text-green-800">Ücretsiz</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Genel Mülakat Soruları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                "Kendinizden bahseder misiniz?"
              </Button>
              <Button variant="outline" className="w-full justify-start">
                "Neden bu pozisyonu istiyorsunuz?"
              </Button>
              <Button variant="outline" className="w-full justify-start">
                "Güçlü ve zayıf yönleriniz nelerdir?"
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teknik Sorular</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                "{userProfile.assignedRole} deneyiminiz nedir?"
              </Button>
              <Button variant="outline" className="w-full justify-start">
                "En zorlu projenizi anlatın"
              </Button>
              <Button variant="outline" className="w-full justify-start">
                "Takım çalışması deneyiminiz"
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Mülakat Simülasyonu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Gerçek mülakat deneyimi yaşayın. AI, sorularınızı analiz ederek geri bildirim verir.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setUserProfile({
                  ...userProfile,
                  interviewsPracticed: userProfile.interviewsPracticed + 1,
                })
              }}
            >
              Mülakat Simülasyonu Başlat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderNetworking = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Users className="w-12 h-12 text-pink-600 mx-auto" />
          <h1 className="text-2xl font-bold">Network Modülü</h1>
          <p className="text-gray-600">Kariyer odaklı networking ve topluluk</p>
          <Badge className="bg-green-100 text-green-800">Ücretsiz</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topluluk Tartışmaları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    user: "Ahmet Y.",
                    role: "Frontend Developer",
                    message: "React 18'in yeni özelliklerini deneyen var mı?",
                    time: "2 saat önce",
                    replies: 5,
                  },
                  {
                    user: "Zeynep K.",
                    role: "UX Designer",
                    message: "Figma'da component system kurmanın en iyi yolları neler?",
                    time: "4 saat önce",
                    replies: 12,
                  },
                  {
                    user: "Mehmet S.",
                    role: "Project Manager",
                    message: "Remote takım yönetimi için önerileriniz?",
                    time: "1 gün önce",
                    replies: 8,
                  },
                ].map((discussion, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">{discussion.user}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {discussion.role}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{discussion.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{discussion.message}</p>
                    <Button variant="ghost" size="sm">
                      {discussion.replies} yanıt
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Önerilen Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Ali Demir", role: "Senior Developer", mutual: 3 },
                  { name: "Seda Yılmaz", role: "Tech Lead", mutual: 5 },
                  { name: "Can Özkan", role: "Product Manager", mutual: 2 },
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-xs text-gray-600">{person.role}</p>
                      <p className="text-xs text-gray-500">{person.mutual} ortak bağlantı</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setUserProfile({
                          ...userProfile,
                          networkConnections: userProfile.networkConnections + 1,
                        })
                      }}
                    >
                      Bağlan
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Etkinlikler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Tech Meetup İstanbul</p>
                  <p className="text-xs text-gray-600">25 Ocak 2024, 19:00</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Katıl
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Bell className="w-12 h-12 text-blue-600 mx-auto" />
          <h1 className="text-2xl font-bold">Bildirimler</h1>
          <p className="text-gray-600">Son güncellemeler ve öneriler</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  {notification.actionUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentScreen(notification.actionUrl as Screen)}
                    >
                      Görüntüle
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAIReport = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Star className="w-12 h-12 text-blue-600 mx-auto" />
          <h1 className="text-2xl font-bold">AI Karne & Eğitim Yönlendirme</h1>
          <p className="text-gray-600">Kişiselleştirilmiş gelişim önerileriniz</p>
          <Badge className="bg-green-100 text-green-800">Ücretsiz</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Güçlü Yönleriniz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userProfile.competencies.length > 0 ? (
                userProfile.competencies.map((competency, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{competency}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Henüz değerlendirme yapılmadı. Testleri tamamlayın.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gelişim Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userProfile.weaknesses.length > 0 ? (
                userProfile.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-amber-600" />
                    <span>{weakness}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Henüz değerlendirme yapılmadı. Testleri tamamlayın.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Önerilen Eğitimler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Liderlik Geliştirme",
                  provider: "Coursera",
                  duration: "4 hafta",
                  level: "Orta",
                },
                {
                  title: "İletişim Becerileri",
                  provider: "Udemy",
                  duration: "6 saat",
                  level: "Başlangıç",
                },
                {
                  title: "Proje Yönetimi",
                  provider: "LinkedIn Learning",
                  duration: "8 hafta",
                  level: "İleri",
                },
                {
                  title: "Zaman Yönetimi",
                  provider: "MasterClass",
                  duration: "2 saat",
                  level: "Başlangıç",
                },
              ].map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{course.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p>
                      {course.provider} - {course.duration}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    Kursa Git
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSubscriptionScreen = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Crown className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="text-2xl font-bold">Trailie Paketleri</h1>
          <p className="text-gray-600">İhtiyacınıza en uygun paketi seçin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Free",
              price: "Ücretsiz",
              features: ["Kişilik Envanteri", "AI Karne", "Mülakat Hazırlık", "Network Modülü"],
              current: userProfile.currentPackage === "free",
            },
            {
              name: "Core",
              price: "$12.99",
              features: [
                "Tüm Free özellikler",
                "Uzmanlık Envanteri",
                "100 Günlük Simülasyon",
                "AI CV Oluşturucu",
                "İş İlanları (1 ay)",
              ],
              current: userProfile.currentPackage === "core",
              popular: true,
            },
            {
              name: "Pro",
              price: "$19.99",
              features: [
                "Tüm Core özellikler",
                "Gelişmiş İş İlanları (3 ay)",
                "Sınırsız CV Güncelleme",
                "Öncelikli Destek",
                "Analitik Raporlar",
              ],
              current: userProfile.currentPackage === "pro",
            },
          ].map((pkg, index) => (
            <Card key={index} className={pkg.popular ? "ring-2 ring-blue-500" : ""}>
              {pkg.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">En Popüler</div>
              )}
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <div className="text-2xl font-bold">{pkg.price}</div>
                  <ul className="space-y-2 text-sm">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    disabled={pkg.current}
                    onClick={() => {
                      if (!pkg.current && pkg.name !== "Free") {
                        setSelectedPackage(pkg.name.toLowerCase() as PackageType)
                        setCurrentScreen("payment")
                      }
                    }}
                  >
                    {pkg.current ? "Mevcut Paket" : pkg.name === "Free" ? "Ücretsiz" : "Seç"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPaymentScreen = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Ödeme</h1>
          <p className="text-gray-600">Paketi satın alın</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <Input placeholder="Kart numarası" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVV" />
              </div>
              <Input placeholder="Kart sahibinin adı" />
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setUserProfile({
                  ...userProfile,
                  currentPackage: selectedPackage,
                })
                setCurrentScreen("home")
              }}
            >
              Ödemeyi Tamamla
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProfileScreen = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <User className="w-12 h-12 text-gray-600 mx-auto" />
          <h1 className="text-2xl font-bold">Profil</h1>
          <p className="text-gray-600">Hesap bilgilerinizi yönetin</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Ad Soyad</label>
                <Input 
                  value={userProfile.name} 
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  placeholder="Adınızı girin"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">E-posta</label>
                <Input 
                  value={userProfile.email} 
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  placeholder="E-posta adresinizi girin"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Meslek</label>
                <Input 
                  value={userProfile.profession} 
                  onChange={(e) => setUserProfile({...userProfile, profession: e.target.value})}
                  placeholder="Mesleğinizi girin"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Değerlendirme Sonuçları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Kişilik Tipi</p>
                  <p className="font-semibold">{userProfile.personalityType || "Henüz değerlendirilmedi"}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Uzmanlık Seviyesi</p>
                  <p className="font-semibold">{userProfile.expertiseLevel || "Henüz değerlendirilmedi"}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Atanan Rol</p>
                  <p className="font-semibold">{userProfile.assignedRole || "Henüz atanmadı"}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Mevcut Paket</p>
                  <p className="font-semibold">{t(userProfile.currentPackage)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">İstatistikler</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{userProfile.jobApplications}</p>
                  <p className="text-sm text-gray-600">İş Başvurusu</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{userProfile.networkConnections}</p>
                  <p className="text-sm text-gray-600">Bağlantı</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{userProfile.interviewsPracticed}</p>
                  <p className="text-sm text-gray-600">Mülakat</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{userProfile.coachingSessionsLeft}</p>
                  <p className="text-sm text-gray-600">Koçluk</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                className="flex-1"
                onClick={() => setCurrentScreen("subscription")}
              >
                Paket Yükselt
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setCurrentScreen("home")}
              >
                Ana Sayfaya Dön
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Mobile Bottom Navigation Component
  const renderMobileBottomNav = () => {
    if (currentScreen === "signin") return null

    const navItems = [
      { id: "home", icon: Home, label: t('home') },
      { id: "dashboard", icon: LayoutDashboard, label: t('dashboard') },
      { id: "job-board", icon: Briefcase, label: t('jobBoard') },
      { id: "notifications", icon: Bell, label: t('notifications'), badge: userProfile.notificationsCount },
      { id: "profile", icon: User, label: t('profile') },
    ]

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 md:hidden z-50">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentScreen === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center space-y-1 relative min-w-0 ${
                  isActive ? "text-teal-600" : "text-gray-600"
                }`}
                onClick={() => setCurrentScreen(item.id as Screen)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs truncate">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[10px]">
                    {item.badge}
                  </span>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderCoachingScreen = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <MessageCircle className="w-12 h-12 text-blue-600 mx-auto" />
          <h1 className="text-2xl font-bold">Kariyer Koçluğu</h1>
          <p className="text-gray-600">Uzman koçlarla kariyerinizi geliştirin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Ahmet Yılmaz",
              title: "Kıdemli Kariyer Koçu",
              experience: "15+ yıl deneyim",
              specialties: ["Liderlik", "Strateji", "Geçiş"],
              rating: 4.9,
              sessions: 3,
              price: "₺500",
            },
            {
              name: "Ayşe Demir",
              title: "İK Uzmanı & Koç",
              experience: "12+ yıl deneyim",
              specialties: ["İK", "Gelişim", "Motivasyon"],
              rating: 4.8,
              sessions: 2,
              price: "₺450",
            },
            {
              name: "Mehmet Kaya",
              title: "Girişimci & Mentor",
              experience: "20+ yıl deneyim",
              specialties: ["Girişimcilik", "İnovasyon", "Büyüme"],
              rating: 4.9,
              sessions: 5,
              price: "₺600",
            },
          ].map((coach, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{coach.name}</h3>
                    <p className="text-sm text-gray-600">{coach.title}</p>
                    <p className="text-xs text-gray-500">{coach.experience}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(coach.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({coach.rating})</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Uzmanlık: {coach.specialties.join(", ")}</p>
                      <p>Seans: {coach.sessions} x {coach.price}</p>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (userProfile.coachingSessionsLeft > 0) {
                        setUserProfile({
                          ...userProfile,
                          coachingSessionsLeft: userProfile.coachingSessionsLeft - 1,
                        })
                        alert("Koçluk seansı rezerve edildi!")
                      } else {
                        setCurrentScreen("subscription")
                      }
                    }}
                  >
                    {userProfile.coachingSessionsLeft > 0 ? "Seans Rezerve Et" : "Paket Yükselt"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Koçluk Seanslarınız</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kalan seans sayısı</p>
                <p className="text-2xl font-bold text-blue-600">{userProfile.coachingSessionsLeft}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentScreen("subscription")}
              >
                Daha Fazla Seans Al
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="pb-16 md:pb-0"> {/* Add bottom padding for mobile nav */}
        {currentScreen === "signin" && renderSignInScreen()}
        {currentScreen === "home" && renderHomeScreen()}
        {currentScreen === "dashboard" && renderDashboard()}
        {currentScreen === "personality-inventory" && renderPersonalityInventory()}
        {currentScreen === "expertise-inventory" && renderExpertiseInventory()}
        {currentScreen === "role-assignment" && renderRoleAssignment()}
        {currentScreen === "simulation-game" && renderSimulationGame()}
        {currentScreen === "simulation-complete" && renderSimulationComplete()}
        {currentScreen === "cv-generator" && renderCVGenerator()}
        {currentScreen === "job-board" && renderJobBoard()}
        {currentScreen === "job-application" && renderJobApplication()}
        {currentScreen === "interview-prep" && renderInterviewPrep()}
        {currentScreen === "networking" && renderNetworking()}
        {currentScreen === "notifications" && renderNotifications()}
        {currentScreen === "ai-report" && renderAIReport()}
        {currentScreen === "subscription" && renderSubscriptionScreen()}
        {currentScreen === "payment" && renderPaymentScreen()}
        {currentScreen === "coaching" && renderCoachingScreen()}
        {currentScreen === "profile" && renderProfileScreen()}
      </div>
      
      {renderMobileBottomNav()}
    </div>
  )
}
