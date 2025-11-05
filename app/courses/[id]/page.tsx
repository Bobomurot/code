"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)

  const courseData: Record<
    string,
    {
      titleUz: string
      titleRu: string
      titleEn: string
      descUz: string
      descRu: string
      descEn: string
      longDescUz: string
      longDescRu: string
      longDescEn: string
      icon: string
      lessons: Array<{
        id: number
        titleUz: string
        titleRu: string
        titleEn: string
        duration: string
        videoUrl?: string
      }>
    }
  > = {
    "1": {
      titleUz: "Sun'iy Intellekt Asoslari",
      titleRu: "Основы искусственного интеллекта",
      titleEn: "AI Fundamentals",
      descUz: "AI, machine learning va deep learning haqida bilib oling",
      descRu: "Узнайте основы ИИ, машинного обучения и глубокого обучения",
      descEn: "Learn the basics of AI, machine learning, and deep learning",
      longDescUz:
        "Ushbu kurs sun'iy intellekt asoslari, mashinali o'rganish algoritmlari va chuqur o'rganish haqida to'liq ma'lumot beradi.",
      longDescRu:
        "Этот курс дает полное понимание основ искусственного интеллекта, алгоритмов машинного обучения и глубокого обучения.",
      longDescEn:
        "This course provides a comprehensive understanding of AI fundamentals, machine learning algorithms, and deep learning concepts.",
      icon: "🤖",
      lessons: [
        {
          id: 1,
          titleUz: "AI nima?",
          titleRu: "Что такое ИИ?",
          titleEn: "What is AI?",
          duration: "45 min",
        },
        {
          id: 2,
          titleUz: "Mashinali o'rganish asoslari",
          titleRu: "Основы машинного обучения",
          titleEn: "Machine Learning Basics",
          duration: "60 min",
        },
        {
          id: 3,
          titleUz: "Supervised Learning",
          titleRu: "Обучение с учителем",
          titleEn: "Supervised Learning",
          duration: "55 min",
        },
        {
          id: 4,
          titleUz: "Unsupervised Learning",
          titleRu: "Обучение без учителя",
          titleEn: "Unsupervised Learning",
          duration: "50 min",
        },
        {
          id: 5,
          titleUz: "Neural tarmoqlar",
          titleRu: "Нейронные сети",
          titleEn: "Neural Networks",
          duration: "65 min",
        },
        {
          id: 6,
          titleUz: "Praktik loyiha",
          titleRu: "Практический проект",
          titleEn: "Practical Project",
          duration: "120 min",
        },
      ],
    },
    "2": {
      titleUz: "Mashinaviy O'rganish",
      titleRu: "Машинное обучение",
      titleEn: "Machine Learning",
      descUz: "Algoritmlari, modellarni o'qitish va tahlilni bilib oling",
      descRu: "Алгоритмы, обучение моделей и анализ данных",
      descEn: "Algorithms, model training, and data analysis",
      longDescUz:
        "Bu kurs mashinali o'rganishning chuqur tahlilini, modellarni o'qitish usullarini va ma'lumotlarni tahlil qilish ko'nikmalarini o'rgatadi.",
      longDescRu:
        "Этот курс охватывает глубокий анализ машинного обучения, методы обучения моделей и навыки анализа данных.",
      longDescEn:
        "This course covers an in-depth analysis of machine learning, model training methods, and data analysis skills.",
      icon: "📊",
      lessons: [
        {
          id: 1,
          titleUz: "Regression Models",
          titleRu: "Модели регрессии",
          titleEn: "Regression Models",
          duration: "70 min",
        },
        {
          id: 2,
          titleUz: "Classification Algorithms",
          titleRu: "Алгоритмы классификации",
          titleEn: "Classification Algorithms",
          duration: "75 min",
        },
        {
          id: 3,
          titleUz: "Decision Trees",
          titleRu: "Деревья решений",
          titleEn: "Decision Trees",
          duration: "60 min",
        },
        {
          id: 4,
          titleUz: "Ensemble Methods",
          titleRu: "Методы ансамбля",
          titleEn: "Ensemble Methods",
          duration: "65 min",
        },
        {
          id: 5,
          titleUz: "Model Evaluation",
          titleRu: "Оценка модели",
          titleEn: "Model Evaluation",
          duration: "55 min",
        },
      ],
    },
  }

  const course = courseData[params.id]

  if (!course) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">
              {language === "uz" ? "Kurs topilmadi" : language === "ru" ? "Курс не найден" : "Course not found"}
            </h1>
            <Button asChild>
              <Link href="/courses">
                {language === "uz" ? "Kurslarni ko'rish" : language === "ru" ? "Все курсы" : "Back to Courses"}
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  const getTitle = () => {
    if (language === "uz") return course.titleUz
    if (language === "ru") return course.titleRu
    return course.titleEn
  }

  const getDesc = () => {
    if (language === "uz") return course.descUz
    if (language === "ru") return course.descRu
    return course.descEn
  }

  const getLongDesc = () => {
    if (language === "uz") return course.longDescUz
    if (language === "ru") return course.longDescRu
    return course.longDescEn
  }

  const getLessonTitle = (lesson: (typeof course.lessons)[0]) => {
    if (language === "uz") return lesson.titleUz
    if (language === "ru") return lesson.titleRu
    return lesson.titleEn
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl">{course.icon}</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-balance">{getTitle()}</h1>
              <p className="text-lg text-muted-foreground">{getDesc()}</p>
            </div>
          </div>
          <Button size="lg" asChild className="mt-4">
            <Link href={`/tests?course=${params.id}`}>
              {language === "uz" ? "Testlar" : language === "ru" ? "Тесты" : "Take Tests"}
            </Link>
          </Button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {language === "uz" ? "Kurs haqida" : language === "ru" ? "О курсе" : "About This Course"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{getLongDesc()}</p>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "uz" ? "Darslar" : language === "ru" ? "Уроки" : "Course Lessons"}</CardTitle>
              <CardDescription>
                {course.lessons.length} {language === "uz" ? "dars" : language === "ru" ? "уроков" : "lessons"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    className="w-full text-left p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{getLessonTitle(lesson)}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                      <span
                        className={`transform transition-transform ${expandedLesson === lesson.id ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </div>

                    {expandedLesson === lesson.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
                          {language === "uz"
                            ? "Bu dars sizga bu mavzu haqida to'liq tushunchaga ega bo'lishiga yordam beradi."
                            : language === "ru"
                              ? "Этот урок поможет вам полностью разобраться в этой теме."
                              : "This lesson will help you master this topic completely."}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
