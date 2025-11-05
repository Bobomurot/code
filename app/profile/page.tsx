"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Award, BookOpen, BarChart3 } from "lucide-react"

interface TestResult {
  id: string
  courseUz: string
  courseRu: string
  courseEn: string
  date: string
  score: number
  percentage: number
  totalQuestions: number
}

interface Certificate {
  id: string
  courseUz: string
  courseRu: string
  courseEn: string
  dateUz: string
  dateRu: string
  dateEn: string
  skillLevel: "beginner" | "intermediate" | "advanced"
  certificateId: string
}

export default function ProfilePage() {
  const { language } = useLanguage()

  const userProfile = {
    nameUz: "Ahmad Abdullayev",
    nameRu: "Ахмад Абдуллаев",
    nameEn: "Ahmad Abdullayev",
    emailUz: "ahmad@example.com",
    emailRu: "ahmad@example.com",
    emailEn: "ahmad@example.com",
    bioUz: "AI va Machine Learning ga qiziq odam, AI dunyosini o'rganish uchun istaqbalmand",
    bioRu: "Человек, заинтересованный в ИИ и машинном обучении, увлеченный изучением мира ИИ",
    bioEn: "Passionate about AI and Machine Learning, eager to master the world of artificial intelligence",
    joinedUz: "Oktabr 2023",
    joinedRu: "Октябрь 2023",
    joinedEn: "October 2023",
    avatar: "👨‍💻",
  }

  const testResults: TestResult[] = [
    {
      id: "1",
      courseUz: "AI Asoslari",
      courseRu: "Основы ИИ",
      courseEn: "AI Fundamentals",
      date: "2024-01-15",
      score: 8,
      percentage: 80,
      totalQuestions: 10,
    },
    {
      id: "2",
      courseUz: "Mashinali O'rganish",
      courseRu: "Машинное обучение",
      courseEn: "Machine Learning",
      date: "2024-01-20",
      score: 9,
      percentage: 90,
      totalQuestions: 10,
    },
    {
      id: "3",
      courseUz: "Chuqurlashtirilgan O'rganish",
      courseRu: "Глубокое обучение",
      courseEn: "Deep Learning",
      date: "2024-01-25",
      score: 7,
      percentage: 70,
      totalQuestions: 10,
    },
    {
      id: "4",
      courseUz: "Ma'lumot Fani",
      courseRu: "Наука о данных",
      courseEn: "Data Science",
      date: "2024-02-01",
      score: 8,
      percentage: 80,
      totalQuestions: 10,
    },
  ]

  const certificates: Certificate[] = [
    {
      id: "1",
      courseUz: "AI Asoslari",
      courseRu: "Основы ИИ",
      courseEn: "AI Fundamentals",
      dateUz: "15-Yanvar, 2024",
      dateRu: "15 января 2024",
      dateEn: "January 15, 2024",
      skillLevel: "beginner",
      certificateId: "CERT-AI-2024-001",
    },
    {
      id: "2",
      courseUz: "Mashinali O'rganish",
      courseRu: "Машинное обучение",
      courseEn: "Machine Learning",
      dateUz: "20-Yanvar, 2024",
      dateRu: "20 января 2024",
      dateEn: "January 20, 2024",
      skillLevel: "intermediate",
      certificateId: "CERT-ML-2024-002",
    },
  ]

  const getCourse = (obj: any) => {
    if (language === "uz") return obj.courseUz
    if (language === "ru") return obj.courseRu
    return obj.courseEn
  }

  const getCertificateDate = (cert: Certificate) => {
    if (language === "uz") return cert.dateUz
    if (language === "ru") return cert.dateRu
    return cert.dateEn
  }

  const getSkillLevelLabel = (level: string) => {
    if (language === "uz") {
      return level === "beginner" ? "Boshlang'ich" : level === "intermediate" ? "O'rta" : "Ilg'or"
    } else if (language === "ru") {
      return level === "beginner" ? "Начинающий" : level === "intermediate" ? "Промежуточный" : "Продвинутый"
    }
    return level === "beginner" ? "Beginner" : level === "intermediate" ? "Intermediate" : "Advanced"
  }

  const averageScore = Math.round(testResults.reduce((sum, r) => sum + r.percentage, 0) / testResults.length)

  const skillLevelColor: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  const getName = () => {
    if (language === "uz") return userProfile.nameUz
    if (language === "ru") return userProfile.nameRu
    return userProfile.nameEn
  }

  const getBio = () => {
    if (language === "uz") return userProfile.bioUz
    if (language === "ru") return userProfile.bioRu
    return userProfile.bioEn
  }

  const getJoined = () => {
    if (language === "uz") return userProfile.joinedUz
    if (language === "ru") return userProfile.joinedRu
    return userProfile.joinedEn
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="text-7xl">{userProfile.avatar}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{getName()}</h1>
                <p className="text-lg text-muted-foreground mb-3">{userProfile.emailUz}</p>
                <p className="text-foreground mb-4 max-w-2xl">{getBio()}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "uz" ? "Qo'shilgan:" : language === "ru" ? "Присоединился:" : "Joined:"} {getJoined()}
                </p>
              </div>
              <Button>
                {language === "uz" ? "Tahrir qilish" : language === "ru" ? "Редактировать" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Testlar" : language === "ru" ? "Тесты" : "Tests Taken"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{testResults.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "uz" ? "Umumiy testlar" : language === "ru" ? "Всего тестов" : "Total tests"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Sertifikatlar" : language === "ru" ? "Сертификаты" : "Certificates"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{certificates.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "uz"
                  ? "Shartli sertifikatlar"
                  : language === "ru"
                    ? "Полученные сертификаты"
                    : "Earned certificates"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "O'rtacha Natija" : language === "ru" ? "Средний балл" : "Average Score"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "uz"
                  ? "Barcha testlar bo'yicha"
                  : language === "ru"
                    ? "Во всех тестах"
                    : "Across all tests"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Darajalar" : language === "ru" ? "Уровни" : "Skill Levels"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "uz" ? "Olgan darajalar" : language === "ru" ? "Достигнутые уровни" : "Levels achieved"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="results" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "uz" ? "Natijalar" : language === "ru" ? "Результаты" : "Results"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "uz" ? "Sertifikatlar" : language === "ru" ? "Сертификаты" : "Certificates"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === "uz" ? "Yutuqlar" : language === "ru" ? "Достижения" : "Achievements"}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "uz" ? "Test Natijalari" : language === "ru" ? "Результаты тестов" : "Test Results"}
                </CardTitle>
                <CardDescription>
                  {language === "uz"
                    ? "O'tgan barcha testlarning natijalari"
                    : language === "ru"
                      ? "Результаты всех пройденных тестов"
                      : "Your results from all completed tests"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testResults.map((result) => (
                    <div key={result.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{getCourse(result)}</h3>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {result.score}/{result.totalQuestions}
                          </div>
                          <div className="text-sm text-muted-foreground">{result.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={result.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((cert) => (
                <Card key={cert.id} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
                  <CardHeader>
                    <div className="relative">
                      <CardTitle className="mb-2 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        {getCourse(cert)}
                      </CardTitle>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${skillLevelColor[cert.skillLevel]}`}>
                        {getSkillLevelLabel(cert.skillLevel)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {language === "uz" ? "Tarixohu:" : language === "ru" ? "Дата:" : "Date:"}
                        </p>
                        <p className="font-semibold">{getCertificateDate(cert)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {language === "uz"
                            ? "Sertifikat ID:"
                            : language === "ru"
                              ? "ID сертификата:"
                              : "Certificate ID:"}
                        </p>
                        <p className="font-mono text-sm">{cert.certificateId}</p>
                      </div>
                      <Button className="w-full mt-4 gap-2 bg-transparent" variant="outline">
                        <Download className="w-4 h-4" />
                        {language === "uz" ? "Yuklab olish" : language === "ru" ? "Скачать" : "Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {certificates.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Award className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">
                    {language === "uz"
                      ? "Sertifikat olmagan. Kurslarni yakunlash uchun testlarni topshiring!"
                      : language === "ru"
                        ? "Сертификаты не получены. Пройдите тесты, чтобы получить сертификаты!"
                        : "No certificates yet. Complete tests to earn certificates!"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  titleUz: "Boshlash",
                  titleRu: "Начало",
                  titleEn: "Getting Started",
                  descUz: "Birinchi testni topshir",
                  descRu: "Пройти первый тест",
                  descEn: "Complete your first test",
                  icon: "🚀",
                  unlocked: true,
                },
                {
                  titleUz: "Ustoz",
                  titleRu: "Мастер",
                  titleEn: "Master",
                  descUz: "3 ta testni 80% dan yuqori topshir",
                  descRu: "Пройти 3 теста с результатом выше 80%",
                  descEn: "Score above 80% on 3 tests",
                  icon: "🏆",
                  unlocked: true,
                },
                {
                  titleUz: "Mukammal",
                  titleRu: "Идеальный",
                  titleEn: "Perfect Score",
                  descUz: "Biror testda 100% natija olish",
                  descRu: "Получить 100% на одном тесте",
                  descEn: "Get 100% on any test",
                  icon: "⭐",
                  unlocked: false,
                },
                {
                  titleUz: "Talabagar",
                  titleRu: "Ученик",
                  titleEn: "Scholar",
                  descUz: "5 ta kurs yakunlash",
                  descRu: "Завершить 5 курсов",
                  descEn: "Complete 5 courses",
                  icon: "📚",
                  unlocked: false,
                },
                {
                  titleUz: "Sherik",
                  titleRu: "Помощник",
                  titleEn: "Helper",
                  descUz: "Forumda 10 ta javob berish",
                  descRu: "Ответить на 10 вопросов на форуме",
                  descEn: "Answer 10 questions in the forum",
                  icon: "💬",
                  unlocked: false,
                },
                {
                  titleUz: "Sertifikat Iga",
                  titleRu: "Обладатель",
                  titleEn: "Certified",
                  descUz: "5 ta sertifikat olish",
                  descRu: "Получить 5 сертификатов",
                  descEn: "Earn 5 certificates",
                  icon: "🎓",
                  unlocked: false,
                },
              ].map((achievement, idx) => {
                const getTitle =
                  language === "uz"
                    ? achievement.titleUz
                    : language === "ru"
                      ? achievement.titleRu
                      : achievement.titleEn
                const getDesc =
                  language === "uz" ? achievement.descUz : language === "ru" ? achievement.descRu : achievement.descEn

                return (
                  <Card key={idx} className={achievement.unlocked ? "" : "opacity-50"}>
                    <CardHeader>
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <CardTitle className="text-lg">{getTitle}</CardTitle>
                      <CardDescription>{getDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`text-sm font-semibold ${
                          achievement.unlocked ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                        }`}
                      >
                        {achievement.unlocked
                          ? language === "uz"
                            ? "Olindi ✓"
                            : language === "ru"
                              ? "Получено ✓"
                              : "Unlocked ✓"
                          : language === "uz"
                            ? "Qayta islash kerak"
                            : language === "ru"
                              ? "Требуется дополнительное усилие"
                              : "Locked"}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
