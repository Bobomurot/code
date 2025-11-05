"use client"

import { useLanguage } from "@/lib/language-context"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import StarryNightBackground from "@/components/ui/starry-night-background"

export default function HomePage() {
  const { language } = useLanguage()

  const courses = [
    {
      id: 1,
      titleUz: "Sun'iy Intellekt Asoslari",
      titleRu: "Основы искусственного интеллекта",
      titleEn: "AI Fundamentals",
      descUz: "AI, machine learning va deep learning haqida bilib oling",
      descRu: "Узнайте основы ИИ, машинного обучения и глубокого обучения",
      descEn: "Learn the basics of AI, machine learning, and deep learning",
      icon: "🤖",
    },
    {
      id: 2,
      titleUz: "Mashinaviy O'rganish",
      titleRu: "Машинное обучение",
      titleEn: "Machine Learning",
      descUz: "Algoritmlari, modellarni o'qitish va tahlilni bilib oling",
      descRu: "Алгоритмы, обучение моделей и анализ данных",
      descEn: "Algorithms, model training, and data analysis",
      icon: "📊",
    },
    {
      id: 3,
      titleUz: "Data Science",
      titleRu: "Наука о данных",
      titleEn: "Data Science",
      descUz: "Ma'lumotlarni tahlil qilish va visualizatsiya qilish",
      descRu: "Анализ и визуализация данных",
      descEn: "Data analysis and visualization",
      icon: "📈",
    },
  ]

  const getTitle = (course: (typeof courses)[0]) => {
    if (language === "uz") return course.titleUz
    if (language === "ru") return course.titleRu
    return course.titleEn
  }

  const getDesc = (course: (typeof courses)[0]) => {
    if (language === "uz") return course.descUz
    if (language === "ru") return course.descRu
    return course.descEn
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <StarryNightBackground />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance text-white">
                {t("welcome", language)}
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">{t("subtitle", language)}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/courses">{t("getStarted", language)}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Link href="/tests">{t("tests", language)}</Link>
                </Button>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center h-80 bg-white/5 backdrop-blur-md rounded-2xl border border-blue-400/30 shadow-lg shadow-blue-500/20">
              <div className="text-6xl text-center animate-pulse">🧠✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/80">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance text-white">{t("featured", language)}</h2>
          <p className="text-white/70 mb-12 max-w-2xl">
            {language === "uz"
              ? "Boshlovchilar va o'rta darajadagi foydalanuvchilar uchun tanlangan kurslar"
              : language === "ru"
                ? "Курсы, отобранные для начинающих и пользователей среднего уровня"
                : "Courses selected for beginners and intermediate learners"}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow bg-white/10 border-white/20 backdrop-blur-sm text-white"
              >
                <CardHeader>
                  <div className="text-4xl mb-3">{course.icon}</div>
                  <CardTitle className="text-white">{getTitle(course)}</CardTitle>
                  <CardDescription className="line-clamp-2 text-white/70">{getDesc(course)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                    asChild
                  >
                    <Link href={`/courses/${course.id}`}>
                      {language === "uz" ? "O'rganish" : language === "ru" ? "Изучать" : "Learn More"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/80">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center border border-white/20 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {language === "uz"
              ? "Testlarni topshiring va bilimingizni aniqlang"
              : language === "ru"
                ? "Пройдите тесты и оцените свои знания"
                : "Take the Tests and Assess Your Knowledge"}
          </h2>
          <p className="mb-8 text-white/90">
            {language === "uz"
              ? "AI, ML va Data Science bo'yicha 10 ta test savollarini topshiring"
              : language === "ru"
                ? "Пройдите 10 тестовых вопросов по ИИ, МО и науке о данных"
                : "Answer 10 test questions on AI, ML, and Data Science"}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/tests">
              {language === "uz" ? "Testlarni boshlash" : language === "ru" ? "Начать тесты" : "Start Tests"}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
