"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

interface Quiz {
  id: string
  titleUz: string
  titleRu: string
  titleEn: string
  descUz: string
  descRu: string
  descEn: string
  questionsCount: number
  difficulty: "beginner" | "intermediate" | "advanced"
  icon: string
}

export default function TestsPage() {
  const { language } = useLanguage()
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")

  const quizzes: Quiz[] = [
    {
      id: "ai-basics",
      titleUz: "AI Asoslari",
      titleRu: "Основы ИИ",
      titleEn: "AI Fundamentals Quiz",
      descUz: "Sun'iy intellekt va mashinali o'rganish asoslari",
      descRu: "Основы искусственного интеллекта и машинного обучения",
      descEn: "Test your knowledge on AI and Machine Learning basics",
      questionsCount: 10,
      difficulty: "beginner",
      icon: "🤖",
    },
    {
      id: "ml-intermediate",
      titleUz: "Mashinali O'rganish",
      titleRu: "Машинное обучение",
      titleEn: "Machine Learning Quiz",
      descUz: "Mashinali o'rganish algoritmlarini o'z bilimingizni sinab ko'ring",
      descRu: "Проверьте свои знания по алгоритмам машинного обучения",
      descEn: "Challenge yourself with ML algorithms and concepts",
      questionsCount: 10,
      difficulty: "intermediate",
      icon: "📊",
    },
    {
      id: "deep-learning",
      titleUz: "Chuqurlashtirilgan O'rganish",
      titleRu: "Глубокое обучение",
      titleEn: "Deep Learning Quiz",
      descUz: "Neural tarmoqlar va deep learning texnikasi",
      descRu: "Нейронные сети и методы глубокого обучения",
      descEn: "Advanced neural networks and deep learning techniques",
      questionsCount: 10,
      difficulty: "advanced",
      icon: "🧠",
    },
  ]

  const getTitle = (quiz: Quiz) => {
    if (language === "uz") return quiz.titleUz
    if (language === "ru") return quiz.titleRu
    return quiz.titleEn
  }

  const getDesc = (quiz: Quiz) => {
    if (language === "uz") return quiz.descUz
    if (language === "ru") return quiz.descRu
    return quiz.descEn
  }

  const getDifficultyLabel = (level: string) => {
    if (language === "uz") {
      return level === "beginner" ? "Boshlang'ich" : level === "intermediate" ? "O'rta" : "Ilg'or"
    } else if (language === "ru") {
      return level === "beginner" ? "Начинающий" : level === "intermediate" ? "Промежуточный" : "Продвинутый"
    }
    return level === "beginner" ? "Beginner" : level === "intermediate" ? "Intermediate" : "Advanced"
  }

  const difficultyColor: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  const filteredQuizzes =
    selectedDifficulty === "all" ? quizzes : quizzes.filter((q) => q.difficulty === selectedDifficulty)

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            {language === "uz" ? "Testlar" : language === "ru" ? "Тесты" : "Quizzes"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === "uz"
              ? "O'z bilimingizni sinab ko'ring va sertifikat olishga harakat qiling"
              : language === "ru"
                ? "Проверьте свои знания и получите сертификаты"
                : "Test your knowledge and earn certificates"}
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">
              {language === "uz" ? "Tezkor test" : language === "ru" ? "Быстрый тест" : "Quick Start"}
            </h2>
            <p className="mb-4 opacity-90">
              {language === "uz"
                ? "Biror darajani tanlang va testni boshlang"
                : language === "ru"
                  ? "Выберите уровень сложности и начните"
                  : "Choose a difficulty level and begin testing yourself"}
            </p>
            <div className="flex flex-wrap gap-2">
              {["beginner", "intermediate", "advanced"].map((level) => (
                <Button
                  key={level}
                  variant={selectedDifficulty === level ? "secondary" : "outline"}
                  className="text-sm"
                  onClick={() => setSelectedDifficulty(level as typeof selectedDifficulty)}
                >
                  {getDifficultyLabel(level)}
                </Button>
              ))}
              <Button variant="secondary" className="ml-auto">
                {language === "uz" ? "Barchasi" : language === "ru" ? "Все" : "All"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                <div className="bg-gradient-to-br from-muted/50 to-muted p-6 flex items-center justify-center h-32">
                  <div className="text-6xl">{quiz.icon}</div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <CardTitle className="text-balance flex-1">{getTitle(quiz)}</CardTitle>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                        difficultyColor[quiz.difficulty]
                      }`}
                    >
                      {getDifficultyLabel(quiz.difficulty)}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">{getDesc(quiz)}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow gap-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{quiz.questionsCount}</span>{" "}
                    {language === "uz" ? "savol" : language === "ru" ? "вопросов" : "questions"}
                  </div>

                  <Button className="w-full mt-auto" asChild>
                    <Link href={`/tests/${quiz.id}`}>
                      {language === "uz" ? "Testni boshlash" : language === "ru" ? "Начать тест" : "Start Quiz"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {language === "uz"
                  ? "Bu darajada testlar topilmadi"
                  : language === "ru"
                    ? "Тесты на этом уровне не найдены"
                    : "No quizzes found for this difficulty level"}
              </p>
              <Button variant="outline" onClick={() => setSelectedDifficulty("all")}>
                {language === "uz" ? "Barchani ko'rish" : language === "ru" ? "Показать все" : "View All"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
