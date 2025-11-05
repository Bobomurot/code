"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"

export default function CoursesPage() {
  const { language } = useLanguage()
  const [selectedLevel, setSelectedLevel] = useState("all")

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
      level: "beginner",
      duration: "4 weeks",
      lessons: 12,
      students: 1250,
      levelUz: "Boshlang'ich",
      levelRu: "Начинающий",
      levelEn: "Beginner",
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
      level: "intermediate",
      duration: "6 weeks",
      lessons: 18,
      students: 890,
      levelUz: "O'rta",
      levelRu: "Промежуточный",
      levelEn: "Intermediate",
    },
    {
      id: 3,
      titleUz: "Chuqurlashtirilgan O'rganish",
      titleRu: "Глубокое обучение",
      titleEn: "Deep Learning",
      descUz: "Neural tarmoqlari, CNN, RNN va Transformer haqida o'rganing",
      descRu: "Нейронные сети, CNN, RNN и трансформеры",
      descEn: "Neural networks, CNN, RNN, and Transformers",
      icon: "🧠",
      level: "advanced",
      duration: "8 weeks",
      lessons: 24,
      students: 450,
      levelUz: "Ilg'or",
      levelRu: "Продвинутый",
      levelEn: "Advanced",
    },
    {
      id: 4,
      titleUz: "Ma'lumot Fani",
      titleRu: "Наука о данных",
      titleEn: "Data Science",
      descUz: "Ma'lumotlarni tahlil qilish va vizualizatsiya qilish",
      descRu: "Анализ и визуализация данных",
      descEn: "Data analysis and visualization",
      icon: "📈",
      level: "intermediate",
      duration: "5 weeks",
      lessons: 15,
      students: 760,
      levelUz: "O'rta",
      levelRu: "Промежуточный",
      levelEn: "Intermediate",
    },
    {
      id: 5,
      titleUz: "NLP asoslari",
      titleRu: "Основы NLP",
      titleEn: "NLP Fundamentals",
      descUz: "Natural Language Processing teknikal va ilovalari",
      descRu: "Техники и приложения обработки естественного языка",
      descEn: "Natural language processing techniques and applications",
      icon: "💬",
      level: "advanced",
      duration: "7 weeks",
      lessons: 20,
      students: 520,
      levelUz: "Ilg'or",
      levelRu: "Продвинутый",
      levelEn: "Advanced",
    },
    {
      id: 6,
      titleUz: "Komp'yuter Ko'rish",
      titleRu: "Компьютерное зрение",
      titleEn: "Computer Vision",
      descUz: "Rasm qayta ishlash va rasm tanish texnikalari",
      descRu: "Обработка изображений и методы распознавания",
      descEn: "Image processing and recognition techniques",
      icon: "👁️",
      level: "advanced",
      duration: "8 weeks",
      lessons: 22,
      students: 380,
      levelUz: "Ilg'or",
      levelRu: "Продвинутый",
      levelEn: "Advanced",
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

  const getLevel = (course: (typeof courses)[0]) => {
    if (language === "uz") return course.levelUz
    if (language === "ru") return course.levelRu
    return course.levelEn
  }

  const filteredCourses = selectedLevel === "all" ? courses : courses.filter((c) => c.level === selectedLevel)

  const levelColor: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            {language === "uz" ? "Barcha Kurslar" : language === "ru" ? "Все курсы" : "All Courses"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === "uz"
              ? "Boshlang'ich darajadan ilg'or darajagacha olib boruvchi mukammal o'quv dasturi"
              : language === "ru"
                ? "Полная учебная программа от начинающих до продвинутых"
                : "Complete learning curriculum from beginner to advanced"}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold mb-4">
            {language === "uz"
              ? "Daraja bo'yicha filtrlash"
              : language === "ru"
                ? "Фильтр по уровню"
                : "Filter by Level"}
          </h2>
          <Tabs defaultValue="all" onValueChange={setSelectedLevel} className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:w-auto md:grid-cols-4 bg-muted/50">
              <TabsTrigger value="all">
                {language === "uz" ? "Barchasi" : language === "ru" ? "Все" : "All"}
              </TabsTrigger>
              <TabsTrigger value="beginner">{getLevel(courses[0])}</TabsTrigger>
              <TabsTrigger value="intermediate">{getLevel(courses[1])}</TabsTrigger>
              <TabsTrigger value="advanced">{getLevel(courses[2])}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{course.icon}</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${levelColor[course.level]}`}>
                      {getLevel(course)}
                    </span>
                  </div>
                  <CardTitle className="text-balance">{getTitle(course)}</CardTitle>
                  <CardDescription className="line-clamp-2">{getDesc(course)}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow gap-4">
                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-border text-sm">
                    <div className="text-center">
                      <div className="font-bold text-foreground">{course.lessons}</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "uz" ? "Darslar" : language === "ru" ? "Уроки" : "Lessons"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground">{course.duration}</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "uz" ? "Vaqt" : language === "ru" ? "Время" : "Duration"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground">{(course.students / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "uz" ? "O'quvchi" : language === "ru" ? "Ученики" : "Students"}
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <Button className="w-full mt-auto" asChild>
                    <Link href={`/courses/${course.id}`}>
                      {language === "uz" ? "Kursni ko'rish" : language === "ru" ? "Просмотреть курс" : "View Course"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
