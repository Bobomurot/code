"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { ThumbsUp, MessageCircle } from "lucide-react"

interface Answer {
  id: string
  author: string
  authorAvatar: string
  content: string
  createdAt: string
  likes: number
  isAccepted: boolean
}

interface QuestionDetail {
  id: string
  titleUz: string
  titleRu: string
  titleEn: string
  contentUz: string
  contentRu: string
  contentEn: string
  author: string
  authorAvatar: string
  createdAt: string
  views: number
  category: string
  answers: Answer[]
}

const questionsData: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    titleUz: "Neural tarmoqdagi neyronlar soni qancha bo'lishi kerak?",
    titleRu: "Сколько нейронов должно быть в нейронной сети?",
    titleEn: "How many neurons should a neural network have?",
    contentUz:
      "Men o'z modelimni yaratmoqchiman ammo neyronlar sonini qanday tanlashni bilmayman. Juda ko'p neyron xatolarni ko'paytiradimi? Yoki kam neyron yetarli emas?",
    contentRu:
      "Я создаю свою модель, но не знаю, как выбрать количество нейронов. Слишком много нейронов увеличивает ошибку? Или слишком мало нейронов недостаточно?",
    contentEn:
      "I'm building my model but unsure how to choose the number of neurons. Do too many neurons cause errors? Or are too few neurons insufficient?",
    author: "Ali",
    authorAvatar: "👨",
    createdAt: "2 hours ago",
    views: 234,
    category: "dl",
    answers: [
      {
        id: "a1",
        author: "Expert User",
        authorAvatar: "👨‍🏫",
        content:
          "Neyron sonini tanlash asosan masalaning murakkabligi va mavjud ma'lumotlar miqdoridan bog'liq. Umuman olganda, siz kichik qiymatdan boshlashingiz kerak va sezilarli to'liq model kerak bo'lgunga qadar oshirishingiz kerak.",
        createdAt: "1 hour ago",
        likes: 15,
        isAccepted: true,
      },
      {
        id: "a2",
        author: "Data Scientist",
        authorAvatar: "👩‍💼",
        content:
          "Cross-validation dan foydalanib turli neyron sonini sinab ko'ring. Bu sizga eng yaxshi natija beradigan konfiguratsiyani topishga yordam beradi.",
        createdAt: "30 minutes ago",
        likes: 8,
        isAccepted: false,
      },
    ],
  },
  "2": {
    id: "2",
    titleUz: "Overfitting'ni qanday oldini olish mumkin?",
    titleRu: "Как предотвратить переобучение?",
    titleEn: "How to prevent overfitting in my model?",
    contentUz:
      "Mening modelim training ma'lumotlarida yaxshi lekin test ma'lumotlarida yomon ishlayapti. Bu overfitting bo'lsa, uni qanday hal qilish mumkin?",
    contentRu:
      "Моя модель хорошо работает на обучающих данных, но плохо на тестовых. Если это переобучение, как его исправить?",
    contentEn:
      "My model performs well on training data but poorly on test data. If this is overfitting, how can I fix it?",
    author: "Fatima",
    authorAvatar: "👩",
    createdAt: "4 hours ago",
    views: 456,
    category: "ml",
    answers: [
      {
        id: "b1",
        author: "ML Expert",
        authorAvatar: "👨‍💼",
        content:
          "Overfitting oldini olishning bir necha usuli bor: 1) Regularization (L1, L2) qo'llang, 2) Dropout ishlatish, 3) Data augmentation qilish, 4) Erta to'xtashni ishlatish",
        createdAt: "2 hours ago",
        likes: 24,
        isAccepted: true,
      },
    ],
  },
}

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [newAnswer, setNewAnswer] = useState("")
  const [answerSubmitted, setAnswerSubmitted] = useState(false)

  const question = questionsData[params.id]

  if (!question) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "uz" ? "Savol topilmadi" : language === "ru" ? "Вопрос не найден" : "Question not found"}
          </h1>
          <Button asChild>
            <Link href="/community">
              {language === "uz" ? "Forumga qaytish" : language === "ru" ? "Вернуться на форум" : "Back to Forum"}
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  const getTitle = () => {
    if (language === "uz") return question.titleUz
    if (language === "ru") return question.titleRu
    return question.titleEn
  }

  const getContent = () => {
    if (language === "uz") return question.contentUz
    if (language === "ru") return question.contentRu
    return question.contentEn
  }

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      setAnswerSubmitted(true)
      setNewAnswer("")
      setTimeout(() => setAnswerSubmitted(false), 3000)
    }
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/community">
            ← {language === "uz" ? "Forumga qaytish" : language === "ru" ? "Вернуться на форум" : "Back to Forum"}
          </Link>
        </Button>

        {/* Question */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl mb-4 text-balance">{getTitle()}</CardTitle>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{question.authorAvatar}</div>
                <div>
                  <div className="font-semibold">{question.author}</div>
                  <div className="text-sm text-muted-foreground">{question.createdAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {question.views} {language === "uz" ? "ko'rish" : language === "ru" ? "просмотры" : "views"}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{getContent()}</p>
          </CardContent>
        </Card>

        {/* Answers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {question.answers.length} {language === "uz" ? "javob" : language === "ru" ? "ответов" : "Answers"}
          </h2>

          <div className="space-y-4">
            {question.answers.map((answer) => (
              <Card key={answer.id} className={answer.isAccepted ? "border-green-200 bg-green-50/50" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{answer.authorAvatar}</div>
                      <div>
                        <div className="font-semibold">{answer.author}</div>
                        <div className="text-sm text-muted-foreground">{answer.createdAt}</div>
                      </div>
                    </div>
                    {answer.isAccepted && (
                      <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs font-semibold px-2 py-1 rounded">
                        {language === "uz" ? "Qabul qilingan" : language === "ru" ? "Принято" : "Accepted"}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed mb-4">{answer.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      {answer.likes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Write Answer */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "uz" ? "Javob yozing" : language === "ru" ? "Напишите ответ" : "Write an Answer"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder={
                  language === "uz"
                    ? "O'z javobingizni yozing..."
                    : language === "ru"
                      ? "Напишите ваш ответ..."
                      : "Write your answer..."
                }
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={5}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline">
                  {language === "uz" ? "Bekor qilish" : language === "ru" ? "Отмена" : "Cancel"}
                </Button>
                <Button onClick={handleSubmitAnswer} disabled={!newAnswer.trim()}>
                  {language === "uz" ? "Javob jo'natish" : language === "ru" ? "Отправить ответ" : "Post Answer"}
                </Button>
              </div>
              {answerSubmitted && (
                <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-3 rounded">
                  {language === "uz"
                    ? "Javobingiz muvaffaqiyatli jo'natildi!"
                    : language === "ru"
                      ? "Ваш ответ успешно отправлен!"
                      : "Your answer has been posted!"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
