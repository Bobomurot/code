"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { Search, MessageCircle, ThumbsUp } from "lucide-react"

interface Question {
  id: string
  titleUz: string
  titleRu: string
  titleEn: string
  descriptionUz: string
  descriptionRu: string
  descriptionEn: string
  author: string
  authorAvatar: string
  createdAt: string
  category: string
  answers: number
  views: number
  likes: number
  tags: string[]
}

export default function CommunityPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNewQuestion, setShowNewQuestion] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const categories = [
    { id: "all", labelUz: "Barchasi", labelRu: "Все", labelEn: "All" },
    { id: "ai", labelUz: "Sun'iy Intellekt", labelRu: "Искусственный интеллект", labelEn: "AI" },
    { id: "ml", labelUz: "Mashinali O'rganish", labelRu: "Машинное обучение", labelEn: "Machine Learning" },
    { id: "dl", labelUz: "Chuqurlashtirilgan O'rganish", labelRu: "Глубокое обучение", labelEn: "Deep Learning" },
  ]

  const questions: Question[] = [
    {
      id: "1",
      titleUz: "Neural tarmoqdagi neyronlar soni qancha bo'lishi kerak?",
      titleRu: "Сколько нейронов должно быть в нейронной сети?",
      titleEn: "How many neurons should a neural network have?",
      descriptionUz: "Men o'z modelimni yaratmoqchiman ammo neyronlar sonini qanday tanlashni bilmayman",
      descriptionRu: "Я создаю свою модель, но не знаю, как выбрать количество нейронов",
      descriptionEn: "I'm building my model but unsure how to choose the number of neurons",
      author: "Ali",
      authorAvatar: "👨",
      createdAt: "2 hours ago",
      category: "dl",
      answers: 5,
      views: 234,
      likes: 12,
      tags: ["neural-network", "architecture"],
    },
    {
      id: "2",
      titleUz: "Overfitting'ni qanday oldini olish mumkin?",
      titleRu: "Как предотвратить переобучение?",
      titleEn: "How to prevent overfitting in my model?",
      descriptionUz: "Mening modelim training ma'lumotlarida yaxshi lekin test ma'lumotlarida yomon ishlayapti",
      descriptionRu: "Моя модель хорошо работает на обучающих данных, но плохо на тестовых",
      descriptionEn: "My model performs well on training data but poorly on test data",
      author: "Fatima",
      authorAvatar: "👩",
      createdAt: "4 hours ago",
      category: "ml",
      answers: 8,
      views: 456,
      likes: 24,
      tags: ["overfitting", "regularization"],
    },
    {
      id: "3",
      titleUz: "Data Augmentation nimaga kerak?",
      titleRu: "Зачем нужно дополнение данных?",
      titleEn: "What is the purpose of Data Augmentation?",
      descriptionUz: "Data Augmentation'ning ahamiyatini tushunmayman",
      descriptionRu: "Я не понимаю важность дополнения данных",
      descriptionEn: "I don't understand the importance of data augmentation",
      author: "Ahmad",
      authorAvatar: "👨",
      createdAt: "1 day ago",
      category: "ml",
      answers: 3,
      views: 178,
      likes: 8,
      tags: ["data-augmentation", "training"],
    },
    {
      id: "4",
      titleUz: "CNN va RNN o'rtasida farq nima?",
      titleRu: "В чем разница между CNN и RNN?",
      titleEn: "What's the difference between CNN and RNN?",
      descriptionUz: "CNN va RNN qachon ishlatish kerakligini bilishga muhtaj",
      descriptionRu: "Мне нужно понять, когда использовать CNN и когда RNN",
      descriptionEn: "I need to understand when to use CNN versus RNN",
      author: "Leila",
      authorAvatar: "👩",
      createdAt: "3 days ago",
      category: "dl",
      answers: 12,
      views: 892,
      likes: 45,
      tags: ["cnn", "rnn", "comparison"],
    },
    {
      id: "5",
      titleUz: "AI qachon yangi bo'lar?",
      titleRu: "Когда AI станет новым?",
      titleEn: "What's the future of AI?",
      descriptionUz: "Sun'iy intellekt oladigan kelasi jadvali qanday?",
      descriptionRu: "Какой путь развития у искусственного интеллекта?",
      descriptionEn: "What is the future direction of artificial intelligence?",
      author: "Hassan",
      authorAvatar: "👨",
      createdAt: "5 days ago",
      category: "ai",
      answers: 7,
      views: 654,
      likes: 31,
      tags: ["ai-future", "trends"],
    },
    {
      id: "6",
      titleUz: "Transfer Learning qanday ishlaydi?",
      titleRu: "Как работает трансферное обучение?",
      titleEn: "How does Transfer Learning work?",
      descriptionUz: "Transfer Learning'ni qo'llayotganida xatolik qilyapman",
      descriptionRu: "Я получаю ошибки при использовании трансферного обучения",
      descriptionEn: "I'm getting errors when using transfer learning",
      author: "Sara",
      authorAvatar: "👩",
      createdAt: "1 week ago",
      category: "dl",
      answers: 4,
      views: 289,
      likes: 15,
      tags: ["transfer-learning", "pre-trained-models"],
    },
  ]

  const getTitle = (q: Question) => {
    if (language === "uz") return q.titleUz
    if (language === "ru") return q.titleRu
    return q.titleEn
  }

  const getDescription = (q: Question) => {
    if (language === "uz") return q.descriptionUz
    if (language === "ru") return q.descriptionRu
    return q.descriptionEn
  }

  const getCategoryLabel = (id: string) => {
    const cat = categories.find((c) => c.id === id)
    if (!cat) return id
    if (language === "uz") return cat.labelUz
    if (language === "ru") return cat.labelRu
    return cat.labelEn
  }

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      getTitle(q).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDescription(q).toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            {language === "uz" ? "Jamoa Forumi" : language === "ru" ? "Форум сообщества" : "Community Forum"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === "uz"
              ? "Savollarni so'ring, javoblarni berish, va boshqalar bilan bilim ala-turuncha qiling"
              : language === "ru"
                ? "Задавайте вопросы, делитесь ответами и учитесь с другими"
                : "Ask questions, share answers, and learn together with the community"}
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder={
                    language === "uz"
                      ? "Savollarni izlash..."
                      : language === "ru"
                        ? "Поиск вопросов..."
                        : "Search questions..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setShowNewQuestion(true)}>
                {language === "uz" ? "Savol qo'shish" : language === "ru" ? "Добавить вопрос" : "Ask Question"}
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap"
                >
                  {getCategoryLabel(cat.id)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {showNewQuestion ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {language === "uz"
                    ? "Yangi savol qo'shish"
                    : language === "ru"
                      ? "Добавить новый вопрос"
                      : "Ask a New Question"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder={
                      language === "uz"
                        ? "Savoling sarlavhasi..."
                        : language === "ru"
                          ? "Заголовок вопроса..."
                          : "Question title..."
                    }
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder={
                      language === "uz"
                        ? "Savolingizning to'liq tavsifini yozing..."
                        : language === "ru"
                          ? "Напишите полное описание вашего вопроса..."
                          : "Write your question in detail..."
                    }
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={5}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewQuestion(false)
                        setNewTitle("")
                        setNewDescription("")
                      }}
                    >
                      {language === "uz" ? "Bekor qilish" : language === "ru" ? "Отмена" : "Cancel"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowNewQuestion(false)
                        setNewTitle("")
                        setNewDescription("")
                      }}
                      disabled={!newTitle || !newDescription}
                    >
                      {language === "uz"
                        ? "Savolni jo'natish"
                        : language === "ru"
                          ? "Отправить вопрос"
                          : "Post Question"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}

          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow cursor-pointer" asChild>
                  <Link href={`/community/${question.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{getTitle(question)}</CardTitle>
                          <CardDescription className="line-clamp-2">{getDescription(question)}</CardDescription>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-bold text-primary">{question.answers}</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "uz" ? "javob" : language === "ru" ? "ответов" : "answers"}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{question.authorAvatar}</div>
                          <div className="text-sm">
                            <div className="font-semibold">{question.author}</div>
                            <div className="text-muted-foreground">{question.createdAt}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {question.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {question.likes}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {question.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {language === "uz"
                      ? "Savol topilmadi"
                      : language === "ru"
                        ? "Вопросы не найдены"
                        : "No questions found"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>
                    {language === "uz"
                      ? "Yangi savol qo'shishga harakat qiling"
                      : language === "ru"
                        ? "Попробуйте добавить новый вопрос"
                        : "Try adding a new question"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {filteredQuestions.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {language === "uz"
                  ? `Jami ${filteredQuestions.length} ta savol topildi`
                  : language === "ru"
                    ? `Найдено ${filteredQuestions.length} вопросов`
                    : `Found ${filteredQuestions.length} questions`}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
