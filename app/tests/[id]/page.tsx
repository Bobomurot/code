"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

interface Question {
  id: number
  questionUz: string
  questionRu: string
  questionEn: string
  options: Array<{
    id: string
    textUz: string
    textRu: string
    textEn: string
  }>
  correctAnswerId: string
  explanationUz: string
  explanationRu: string
  explanationEn: string
}

const quizData: Record<string, { titleUz: string; titleRu: string; titleEn: string; questions: Question[] }> = {
  "ai-basics": {
    titleUz: "AI Asoslari",
    titleRu: "Основы ИИ",
    titleEn: "AI Fundamentals Quiz",
    questions: [
      {
        id: 1,
        questionUz: "Sun'iy Intellekt (AI) nima?",
        questionRu: "Что такое искусственный интеллект (ИИ)?",
        questionEn: "What is Artificial Intelligence (AI)?",
        options: [
          {
            id: "a",
            textUz: "Faqat robotlar uchun ishlatiladigan texnologiya",
            textRu: "Технология, используемая только для робототехники",
            textEn: "Technology used only for robotics",
          },
          {
            id: "b",
            textUz: "Mashinalar va tizimlarni inson kabi fikrlash qobiliyatini berish",
            textRu: "Способность придавать машинам человекоподобное мышление",
            textEn: "The ability to provide machines with human-like thinking",
          },
          {
            id: "c",
            textUz: "Faqat matematik formullalar to'plami",
            textRu: "Только набор математических формул",
            textEn: "Only a set of mathematical formulas",
          },
          {
            id: "d",
            textUz: "Kompyuterning ishlash tezligi",
            textRu: "Скорость работы компьютера",
            textEn: "The speed of computer processing",
          },
        ],
        correctAnswerId: "b",
        explanationUz:
          "AI mashinalar va tizimlarni inson kabi fikrlash, o'rganish va qaror qabul qilish qobiliyatini berish",
        explanationRu: "ИИ - это способность придавать машинам человекоподобное мышление, обучение и принятие решений",
        explanationEn:
          "AI is the ability to provide machines with human-like thinking, learning, and decision-making capabilities",
      },
      {
        id: 2,
        questionUz: "Mashinali O'rganish (ML) nima?",
        questionRu: "Что такое машинное обучение (МО)?",
        questionEn: "What is Machine Learning (ML)?",
        options: [
          {
            id: "a",
            textUz: "Mashinalarni faqat kitob o'qitish orqali o'rganish",
            textRu: "Обучение машин только чтением книг",
            textEn: "Teaching machines only through reading books",
          },
          {
            id: "b",
            textUz: "Mashinalarni o'z tajribasi orqali o'rganish",
            textRu: "Обучение машин посредством собственного опыта",
            textEn: "Teaching machines through their own experience",
          },
          {
            id: "c",
            textUz: "Mashinalarni yangi dasturni yozish",
            textRu: "Написание новой программы для машин",
            textEn: "Writing new programs for machines",
          },
          {
            id: "d",
            textUz: "Mashinaning RAM'i ko'paytirilishi",
            textRu: "Увеличение памяти машины",
            textEn: "Increasing the memory of machines",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Mashinali o'rganish bu mashinalarni axloqsiz o'rganish imkonini beradigan texnologiya",
        explanationRu: "Машинное обучение - это технология, которая позволяет машинам обучаться на основе опыта",
        explanationEn:
          "Machine Learning is a technology that enables machines to learn from data and improve their performance",
      },
      {
        id: 3,
        questionUz: "Chuqurlashtirilgan O'rganish (Deep Learning) nima?",
        questionRu: "Что такое глубокое обучение (DL)?",
        questionEn: "What is Deep Learning?",
        options: [
          {
            id: "a",
            textUz: "Juda chuq quyular ko'rish",
            textRu: "Просмотр очень глубоких скважин",
            textEn: "Looking at very deep wells",
          },
          {
            id: "b",
            textUz: "Neural tarmoqlardan foydalanish bilan mashinali o'rganish",
            textRu: "Машинное обучение с использованием нейронных сетей",
            textEn: "Machine learning using neural networks",
          },
          {
            id: "c",
            textUz: "Faqat matematik tahlil",
            textRu: "Только математический анализ",
            textEn: "Only mathematical analysis",
          },
          {
            id: "d",
            textUz: "Kitoblarni o'rganish jarayoni",
            textRu: "Процесс изучения книг",
            textEn: "The process of studying books",
          },
        ],
        correctAnswerId: "b",
        explanationUz:
          "Chuqurlashtirilgan o'rganish neural tarmoqlardan foydalanish bilan mashinali o'rganishning bir turi",
        explanationRu: "Глубокое обучение - это вид машинного обучения с использованием нейронных сетей",
        explanationEn: "Deep learning is a subset of machine learning that uses neural networks",
      },
      {
        id: 4,
        questionUz: "Supervised Learning (O'qituvchi bilan o'rganish) nima?",
        questionRu: "Что такое обучение с учителем?",
        questionEn: "What is Supervised Learning?",
        options: [
          {
            id: "a",
            textUz: "O'qituvchisiz o'rganish",
            textRu: "Обучение без учителя",
            textEn: "Learning without a teacher",
          },
          {
            id: "b",
            textUz: "Label qo'yilgan ma'lumotlarga qarab o'rganish",
            textRu: "Обучение на основе помеченных данных",
            textEn: "Learning from labeled data",
          },
          {
            id: "c",
            textUz: "Faqat inson o'qitish jarayoni",
            textRu: "Только процесс обучения людей",
            textEn: "Only the human teaching process",
          },
          {
            id: "d",
            textUz: "Mashinalarni kuzatish",
            textRu: "Наблюдение за машинами",
            textEn: "Monitoring machines",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Supervised Learning bu ma'lumot label (belgi) bilan berilgan holda mashinalarni o'rgatish",
        explanationRu: "Обучение с учителем - это обучение машин на основе помеченных (подписанных) данных",
        explanationEn:
          "Supervised Learning involves training machines on labeled data where the correct answers are known",
      },
      {
        id: 5,
        questionUz: "Unsupervised Learning (O'qituvchisiz o'rganish) nima?",
        questionRu: "Что такое обучение без учителя?",
        questionEn: "What is Unsupervised Learning?",
        options: [
          {
            id: "a",
            textUz: "Label qo'yilgan ma'lumotlarga qarab o'rganish",
            textRu: "Обучение на основе помеченных данных",
            textEn: "Learning from labeled data",
          },
          {
            id: "b",
            textUz: "Label qo'yilmagan ma'lumotlardan o'rganish",
            textRu: "Обучение на основе непомеченных данных",
            textEn: "Learning from unlabeled data",
          },
          {
            id: "c",
            textUz: "Faqat inson o'rni bilan o'rganish",
            textRu: "Обучение только с присутствием человека",
            textEn: "Learning only with human presence",
          },
          {
            id: "d",
            textUz: "Mashinalarni o'qitmaslik",
            textRu: "Не обучение машин",
            textEn: "Not training machines",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Unsupervised Learning bu label qo'yilmagan ma'lumotlardan naqsh va tuzilmani topish",
        explanationRu: "Обучение без учителя - это поиск паттернов и структур в непомеченных данных",
        explanationEn: "Unsupervised Learning involves finding patterns in unlabeled data",
      },
      {
        id: 6,
        questionUz: "Neural Tarmoq (Neural Network) nima?",
        questionRu: "Что такое нейронная сеть?",
        questionEn: "What is a Neural Network?",
        options: [
          {
            id: "a",
            textUz: "Faqat kompyuterni ulash",
            textRu: "Только подключение компьютеров",
            textEn: "Only connecting computers",
          },
          {
            id: "b",
            textUz: "Insan miyasining tuzilmasiga o'xshash mashinali o'rganish modeli",
            textRu: "Модель машинного обучения, похожая на структуру человеческого мозга",
            textEn: "A machine learning model inspired by the human brain structure",
          },
          {
            id: "c",
            textUz: "Faqat internet tarmogi",
            textRu: "Только интернет-сеть",
            textEn: "Only internet network",
          },
          {
            id: "d",
            textUz: "Elektr kabellarining to'plami",
            textRu: "Набор электрических кабелей",
            textEn: "A collection of electrical cables",
          },
        ],
        correctAnswerId: "b",
        explanationUz:
          "Neural tarmoq insan miyasining neyronlari kabi ishlash uchun yaratilgan mashinali o'rganish modeli",
        explanationRu: "Нейронная сеть - это модель машинного обучения, вдохновленная структурой человеческого мозга",
        explanationEn: "A neural network is a machine learning model inspired by how neurons in the human brain work",
      },
      {
        id: 7,
        questionUz: "Big Data nima?",
        questionRu: "Что такое большие данные?",
        questionEn: "What is Big Data?",
        options: [
          {
            id: "a",
            textUz: "Faqat katta raqamlar",
            textRu: "Только большие числа",
            textEn: "Only large numbers",
          },
          {
            id: "b",
            textUz: "Shunga o'xshash katta, murakkab va chuqur ma'lumotlar",
            textRu: "Огромные, сложные и громадные объемы данных",
            textEn: "Large volumes of complex and diverse data",
          },
          {
            id: "c",
            textUz: "Faqat kompyuter xotirasining o'lchami",
            textRu: "Только размер памяти компьютера",
            textEn: "Only computer memory size",
          },
          {
            id: "d",
            textUz: "Kitoblarning to'plami",
            textRu: "Набор книг",
            textEn: "A collection of books",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Big Data bu shunga o'xshash katta, murakkab va chuqur ma'lumotlar to'plami",
        explanationRu: "Большие данные - это огромные объемы разнообразных и сложных данных",
        explanationEn: "Big Data refers to large volumes of complex and diverse data that require advanced processing",
      },
      {
        id: 8,
        questionUz: "Overfitting nima?",
        questionRu: "Что такое переобучение?",
        questionEn: "What is Overfitting?",
        options: [
          {
            id: "a",
            textUz: "Juda yaxshi o'rganish",
            textRu: "Очень хорошее обучение",
            textEn: "Very good learning",
          },
          {
            id: "b",
            textUz: "Modeli training ma'lumotlarga juda yaxshi mosish, ammo yangi ma'lumotlarda yomon",
            textRu: "Когда модель очень хорошо подходит к обучающим данным, но плохо на новых",
            textEn: "When a model fits training data too well but performs poorly on new data",
          },
          {
            id: "c",
            textUz: "Mashinalarni ko'proq o'rganish",
            textRu: "Больше обучения машин",
            textEn: "More machine training",
          },
          {
            id: "d",
            textUz: "Kompyuterning o'lchami",
            textRu: "Размер компьютера",
            textEn: "Computer size",
          },
        ],
        correctAnswerId: "b",
        explanationUz:
          "Overfitting bu modeli training ma'lumotlarga juda yaxshi mosish ammo yangi ma'lumotlarda yomon ko'rsatish",
        explanationRu:
          "Переобучение - это когда модель слишком хорошо подходит к данным обучения, но плохо работает на новых данных",
        explanationEn:
          "Overfitting occurs when a model learns the training data too well and performs poorly on new unseen data",
      },
      {
        id: 9,
        questionUz: "Feature Engineering nima?",
        questionRu: "Что такое инженерия признаков?",
        questionEn: "What is Feature Engineering?",
        options: [
          {
            id: "a",
            textUz: "Mashinalarni parchalar bilan yig'ish",
            textRu: "Сборка машин из деталей",
            textEn: "Assembling machines from parts",
          },
          {
            id: "b",
            textUz: "Ma'lumotlardan foydali o'zgaruvchilar yaratish va tanlash",
            textRu: "Создание и выбор полезных переменных из данных",
            textEn: "Creating and selecting useful features from data",
          },
          {
            id: "c",
            textUz: "Faqat coding yozish",
            textRu: "Только написание кода",
            textEn: "Only writing code",
          },
          {
            id: "d",
            textUz: "Kompyuter xotirasi boshqarish",
            textRu: "Управление памятью компьютера",
            textEn: "Managing computer memory",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Feature Engineering bu ma'lumotlardan foydali o'zgaruvchilar yaratish va tanlash jarayoni",
        explanationRu: "Инженерия признаков - это процесс создания и выбора полезных переменных из исходных данных",
        explanationEn: "Feature Engineering is the process of creating and selecting useful variables from raw data",
      },
      {
        id: 10,
        questionUz: "Model Validation nima?",
        questionRu: "Что такое проверка модели?",
        questionEn: "What is Model Validation?",
        options: [
          {
            id: "a",
            textUz: "Modelni to'ri ishlashini tekshirish",
            textRu: "Проверка того, работает ли модель правильно",
            textEn: "Checking if a model works correctly",
          },
          {
            id: "b",
            textUz: "Modelni ijro etish",
            textRu: "Выполнение модели",
            textEn: "Running a model",
          },
          {
            id: "c",
            textUz: "Modelni o'chirish",
            textRu: "Удаление модели",
            textEn: "Deleting a model",
          },
          {
            id: "d",
            textUz: "Modelni nusxalash",
            textRu: "Копирование модели",
            textEn: "Copying a model",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "Model Validation bu modelni to'ri ishlashini va uni yangi ma'lumotlarida test qilish jarayoni",
        explanationRu: "Проверка модели - это процесс тестирования корректности работы модели на новых данных",
        explanationEn: "Model Validation is the process of testing whether a model performs well on new unseen data",
      },
    ],
  },
  "ml-intermediate": {
    titleUz: "Mashinali O'rganish",
    titleRu: "Машинное обучение",
    titleEn: "Machine Learning Quiz",
    questions: [
      {
        id: 1,
        questionUz: "Regression tahlili nima?",
        questionRu: "Что такое анализ регрессии?",
        questionEn: "What is Regression Analysis?",
        options: [
          {
            id: "a",
            textUz: "O'zgaruvchilar o'rtasida munosabatni topish",
            textRu: "Нахождение связи между переменными",
            textEn: "Finding relationships between variables",
          },
          {
            id: "b",
            textUz: "Vaqtni orqaga qaytarish",
            textRu: "Возвращение времени назад",
            textEn: "Going back in time",
          },
          {
            id: "c",
            textUz: "Mashinalarni orqaga qaytarish",
            textRu: "Возврат машин назад",
            textEn: "Returning machines",
          },
          {
            id: "d",
            textUz: "Hech narsa",
            textRu: "Ничего",
            textEn: "Nothing",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "Regression tahlili o'zgaruvchilar o'rtasida munosabatni topishning matheatical usuli",
        explanationRu: "Анализ регрессии - это метод для нахождения линейной связи между переменными",
        explanationEn: "Regression is a statistical method for modeling the relationship between variables",
      },
      {
        id: 2,
        questionUz: "Classification nima?",
        questionRu: "Что такое классификация?",
        questionEn: "What is Classification?",
        options: [
          {
            id: "a",
            textUz: "Ma'lumotlarni guruhhlarga bo'lish",
            textRu: "Разделение данных на категории",
            textEn: "Dividing data into categories",
          },
          {
            id: "b",
            textUz: "Kitoblarni polkaga joylashtirish",
            textRu: "Размещение книг на полке",
            textEn: "Putting books on shelves",
          },
          {
            id: "c",
            textUz: "Mashinalarni tasnif qilish",
            textRu: "Классификация машин",
            textEn: "Classifying machines",
          },
          {
            id: "d",
            textUz: "Talim jarayoni",
            textRu: "Процесс обучения",
            textEn: "Learning process",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "Classification ma'lumotlarni o'ncadan belgilangan sinflarga bo'lish masalasi",
        explanationRu: "Классификация - это задача отнесения данных к предопределенным классам или категориям",
        explanationEn: "Classification is the task of predicting which category or class an observation belongs to",
      },
      {
        id: 3,
        questionUz: "Clustering nima?",
        questionRu: "Что такое кластеризация?",
        questionEn: "What is Clustering?",
        options: [
          {
            id: "a",
            textUz: "O'xshash ma'lumotlarni bir guruhga yig'ish",
            textRu: "Группировка похожих данных вместе",
            textEn: "Grouping similar data points together",
          },
          {
            id: "b",
            textUz: "Ma'lumotlarni ajratish",
            textRu: "Разделение данных",
            textEn: "Separating data",
          },
          {
            id: "c",
            textUz: "Rang klasterini topish",
            textRu: "Поиск кластера цветов",
            textEn: "Finding color clusters",
          },
          {
            id: "d",
            textUz: "Mashinalarni jamlashtirish",
            textRu: "Сборка машин",
            textEn: "Assembling machines",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "Clustering o'xshash ma'lumotlarni avtomatik ravishda bir guruhga yig'ishning usuli",
        explanationRu:
          "Кластеризация - это метод автоматической группировки похожих данных вместе без предварительного обучения",
        explanationEn: "Clustering is an unsupervised learning technique that groups similar data points together",
      },
      {
        id: 4,
        questionUz: "Cross-validation nima?",
        questionRu: "Что такое кросс-валидация?",
        questionEn: "What is Cross-Validation?",
        options: [
          {
            id: "a",
            textUz: "Modeli yangi ma'lumotlarda sinovdan o'tkazish",
            textRu: "Тестирование модели на новых данных",
            textEn: "Testing a model on new data",
          },
          {
            id: "b",
            textUz: "Ma'lumotlarni bo'lib sinovdan o'tkazish",
            textRu: "Разделение и тестирование данных",
            textEn: "Dividing data and testing on each part",
          },
          {
            id: "c",
            textUz: "Modelni tekshirish",
            textRu: "Проверка модели",
            textEn: "Checking the model",
          },
          {
            id: "d",
            textUz: "Formani to'ldirish",
            textRu: "Заполнение формы",
            textEn: "Filling a form",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Cross-validation ma'lumotlarni bo'limlarga bo'lib, har bir qismda modeli sinovdan o'tkazishdir",
        explanationRu: "Кросс-валидация - это метод разделения данных и тестирования модели на каждой части",
        explanationEn:
          "Cross-validation is a technique that divides data into multiple parts to evaluate model performance",
      },
      {
        id: 5,
        questionUz: "Confusion Matrix nima?",
        questionRu: "Что такое матрица ошибок?",
        questionEn: "What is a Confusion Matrix?",
        options: [
          {
            id: "a",
            textUz: "Modeli tayanc qilgan ma'lumotlar",
            textRu: "Данные, на которых был основан модель",
            textEn: "Data that the model was based on",
          },
          {
            id: "b",
            textUz: "Classification modelini baholash uchun jadval",
            textRu: "Таблица для оценки моделей классификации",
            textEn: "A table for evaluating classification models",
          },
          {
            id: "c",
            textUz: "Kafkaning asarlarining to'plami",
            textRu: "Сборка произведений Кафки",
            textEn: "A collection of Kafka's works",
          },
          {
            id: "d",
            textUz: "Oshkorlanmagan xato",
            textRu: "Скрытая ошибка",
            textEn: "Hidden error",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Confusion Matrix classification modelini baholash uchun foydalaniladigan jadval",
        explanationRu: "Матрица ошибок (Confusion Matrix) - это таблица для оценки качества моделей классификации",
        explanationEn: "A Confusion Matrix is a table used to evaluate the performance of a classification model",
      },
      {
        id: 6,
        questionUz: "Accuracy nima?",
        questionRu: "Что такое точность?",
        questionEn: "What is Accuracy?",
        options: [
          {
            id: "a",
            textUz: "Modelning to'g'ri javob berish foizi",
            textRu: "Процент правильных ответов модели",
            textEn: "The percentage of correct predictions",
          },
          {
            id: "b",
            textUz: "Modeli to'g'ri qaror qabul qilish",
            textRu: "Правильное решение модели",
            textEn: "Correct decision making",
          },
          {
            id: "c",
            textUz: "Modeli noto'g'ri javob berish foizi",
            textRu: "Процент неправильных ответов",
            textEn: "The percentage of wrong predictions",
          },
          {
            id: "d",
            textUz: "Kompyuterning to'g'ri ishlashi",
            textRu: "Правильная работа компьютера",
            textEn: "Correct computer operation",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "Accuracy modelning barcha testlar orasida qancha foizi to'g'ri javob berish",
        explanationRu: "Точность - это доля правильно предсказанных примеров от общего количества примеров",
        explanationEn: "Accuracy is the fraction of correct predictions made by the model",
      },
      {
        id: 7,
        questionUz: "Precision va Recall o'rtasida farq nima?",
        questionRu: "В чем разница между точностью и полнотой?",
        questionEn: "What is the difference between Precision and Recall?",
        options: [
          {
            id: "a",
            textUz: "Hech farq yo'q",
            textRu: "Нет разницы",
            textEn: "No difference",
          },
          {
            id: "b",
            textUz: "Precision: to'g'ri musbat ta'riflari nisbati, Recall: topilgan musbatlar nisbati",
            textRu:
              "Точность: отношение верных положительных результатов, Полнота: отношение найденных положительных результатов",
            textEn: "Precision: ratio of correct positive predictions, Recall: ratio of positive instances found",
          },
          {
            id: "c",
            textUz: "Precision kompyuterning tezligi",
            textRu: "Точность - это скорость компьютера",
            textEn: "Precision is computer speed",
          },
          {
            id: "d",
            textUz: "Ularning farqi yo'q",
            textRu: "Между ними нет никаких различий",
            textEn: "They are the same",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Precision: to'g'ri ijobiy prognozlar nisbati. Recall: topilgan ijobiy misollar nisbati",
        explanationRu:
          "Точность показывает долю верных положительных результатов, а полнота показывает долю найденных положительных результатов",
        explanationEn:
          "Precision measures correct positive predictions, while Recall measures coverage of positive instances",
      },
      {
        id: 8,
        questionUz: "Gradient Descent nima?",
        questionRu: "Что такое градиентный спуск?",
        questionEn: "What is Gradient Descent?",
        options: [
          {
            id: "a",
            textUz: "Tog'ni pastga tusish",
            textRu: "Спуск с горы",
            textEn: "Going down a mountain",
          },
          {
            id: "b",
            textUz: "Modelning eng yaxshi parametrlarni topish algoritmi",
            textRu: "Алгоритм для поиска лучших параметров модели",
            textEn: "An optimization algorithm to find the best model parameters",
          },
          {
            id: "c",
            textUz: "Qo'yilgan pog'onalarning to'plami",
            textRu: "Набор расположенных ступеней",
            textEn: "A set of placed steps",
          },
          {
            id: "d",
            textUz: "Faqat matematika",
            textRu: "Только математика",
            textEn: "Only math",
          },
        ],
        correctAnswerId: "b",
        explanationUz:
          "Gradient Descent modelning xatolarini minimallashtirish uchun parametrlarni iterativ tarzda o'zgartiradigan algoritm",
        explanationRu:
          "Градиентный спуск - это алгоритм для минимизации ошибки модели путем итеративного обновления параметров",
        explanationEn:
          "Gradient Descent is an optimization algorithm that iteratively updates model parameters to minimize error",
      },
      {
        id: 9,
        questionUz: "Hyperparameter Tuning nima?",
        questionRu: "Что такое настройка гиперпараметров?",
        questionEn: "What is Hyperparameter Tuning?",
        options: [
          {
            id: "a",
            textUz: "Modelni to'ndir tunni takhfif qilish",
            textRu: "Снижение работы модели ночью",
            textEn: "Reducing model work at night",
          },
          {
            id: "b",
            textUz: "Modelning eng yaxshi qiymatlarni topish",
            textRu: "Поиск лучших значений для модели",
            textEn: "Finding the best values for model settings",
          },
          {
            id: "c",
            textUz: "Zargarning ish jarayoni",
            textRu: "Процесс работы ювелира",
            textEn: "Jewelry making process",
          },
          {
            id: "d",
            textUz: "Musiqaning sozlanishi",
            textRu: "Настройка музыки",
            textEn: "Music tuning",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Hyperparameter Tuning modelning eng yaxshi sozlanish parametrlarini topish jarayoni",
        explanationRu: "Настройка гиперпараметров - это процесс поиска оптимальных значений параметров модели",
        explanationEn:
          "Hyperparameter Tuning is the process of finding the best configuration values for a machine learning model",
      },
      {
        id: 10,
        questionUz: "Ensemble Methods nima?",
        questionRu: "Что такое ансамблевые методы?",
        questionEn: "What are Ensemble Methods?",
        options: [
          {
            id: "a",
            textUz: "Orkestrani ijro etish",
            textRu: "Исполнение оркестром",
            textEn: "Orchestra performance",
          },
          {
            id: "b",
            textUz: "Ko'p modellarni birga ishlatish uchun birlashtirilgan metodlar",
            textRu: "Методы, которые объединяют несколько моделей для лучшего прогноза",
            textEn: "Methods that combine multiple models for better predictions",
          },
          {
            id: "c",
            textUz: "Talib o'quvchilar to'plami",
            textRu: "Группа студентов",
            textEn: "Student group",
          },
          {
            id: "d",
            textUz: "Bitta model ishlatish",
            textRu: "Использование одной модели",
            textEn: "Using a single model",
          },
        ],
        correctAnswerId: "b",
        explanationUz: "Ensemble Methods ko'p modellarning javoblarini birga ishlatib aniq natija olish usuli",
        explanationRu:
          "Ансамблевые методы - это способ объединения предсказаний нескольких моделей для повышения точности",
        explanationEn:
          "Ensemble Methods combine predictions from multiple models to achieve better overall performance",
      },
    ],
  },
  "deep-learning": {
    titleUz: "Chuqurlashtirilgan O'rganish",
    titleRu: "Глубокое обучение",
    titleEn: "Deep Learning Quiz",
    questions: [
      {
        id: 1,
        questionUz: "Convolutional Neural Network (CNN) nima?",
        questionRu: "Что такое сверточная нейронная сеть (CNN)?",
        questionEn: "What is a Convolutional Neural Network (CNN)?",
        options: [
          {
            id: "a",
            textUz: "Rasmlar qo'sha qilish uchun ishlatiladigan neural tarmoq",
            textRu: "Нейронная сеть, используемая для обработки изображений",
            textEn: "A neural network specialized for image processing",
          },
          {
            id: "b",
            textUz: "Faqat suratlarni to'xtash tarmoqi",
            textRu: "Только сеть остановки изображений",
            textEn: "Only for stopping images",
          },
          {
            id: "c",
            textUz: "Qayla bilan ishlash tarmoqi",
            textRu: "Сеть для работы с слоями",
            textEn: "Network for layer work",
          },
          {
            id: "d",
            textUz: "Shunga o'xshash",
            textRu: "Что-то похожее",
            textEn: "Something similar",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "CNN rasmlarni qayta ishlash uchun mo'ljallangan neural tarmoq, o'ziga xos convolution operatsiyasi bor",
        explanationRu:
          "CNN - это нейронная сеть, специализирована для обработки изображений с помощью сверточных операций",
        explanationEn:
          "CNN is a neural network designed for image processing using convolutional operations to extract features",
      },
      {
        id: 2,
        questionUz: "Recurrent Neural Network (RNN) nima?",
        questionRu: "Что такое рекуррентная нейронная сеть (RNN)?",
        questionEn: "What is a Recurrent Neural Network (RNN)?",
        options: [
          {
            id: "a",
            textUz: "Ketma-ketlik ma'lumotlarni qabul qiladigan neural tarmoq",
            textRu: "Нейронная сеть, обрабатывающая последовательные данные",
            textEn: "A neural network that processes sequential data",
          },
          {
            id: "b",
            textUz: "Faqat rasmlar uchun tarmoq",
            textRu: "Только сеть для изображений",
            textEn: "Only for images",
          },
          {
            id: "c",
            textUz: "Qo'l qo'yadigan tarmoq",
            textRu: "Рукопожимающая сеть",
            textEn: "Handshaking network",
          },
          {
            id: "d",
            textUz: "Hech narsa",
            textRu: "Ничего",
            textEn: "Nothing",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "RNN matn, ovoz yoki muvoqqati ketma-ketlik kabi ma'lumotlarni qayta ishlashda to'b keltiradi",
        explanationRu:
          "RNN - это нейронная сеть, которая обрабатывает последовательные данные, такие как текст и временные ряды",
        explanationEn:
          "RNN is designed to process sequential data like text, speech, and time series with memory capability",
      },
      {
        id: 3,
        questionUz: "LSTM (Long Short-Term Memory) nima?",
        questionRu: "Что такое LSTM?",
        questionEn: "What is LSTM?",
        options: [
          {
            id: "a",
            textUz: "RNN-ning uzun muddatli xotirani takomillashtirish usuli",
            textRu: "Улучшенная версия RNN с длительной памятью",
            textEn: "An improved version of RNN with long-term memory",
          },
          {
            id: "b",
            textUz: "Faqat matnni qayta ishlash",
            textRu: "Только обработка текста",
            textEn: "Only text processing",
          },
          {
            id: "c",
            textUz: "Shunga o'xshash tarmoq",
            textRu: "Похожая сеть",
            textEn: "Similar network",
          },
          {
            id: "d",
            textUz: "Yangi modeli",
            textRu: "Новая модель",
            textEn: "New model",
          },
        ],
        correctAnswerId: "a",
        explanationUz: "LSTM RNN-ning uzun muddatli ma'lumotlarni xotirada saqlash qobiliyatini oshirgan versiyasi",
        explanationRu: "LSTM - это специальный тип RNN, который может запоминать долгосрочные зависимости в данных",
        explanationEn: "LSTM is a special type of RNN that can remember long-term dependencies in sequential data",
      },
      {
        id: 4,
        questionUz: "Activation Functions nima?",
        questionRu: "Что такое функции активации?",
        questionEn: "What are Activation Functions?",
        options: [
          {
            id: "a",
            textUz: "Neural neyronni faollashtiruvchi matematik funksiyalar",
            textRu: "Математические функции, активирующие нейроны",
            textEn: "Mathematical functions that activate neurons in a network",
          },
          {
            id: "b",
            textUz: "Modeli ishlatish tugmasi",
            textRu: "Кнопка включения модели",
            textEn: "Model on/off button",
          },
          {
            id: "c",
            textUz: "Faqat matematik formulalar",
            textRu: "Только математические формулы",
            textEn: "Only math formulas",
          },
          {
            id: "d",
            textUz: "Elektr signali",
            textRu: "Электрический сигнал",
            textEn: "Electrical signal",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Activation Functions neural tarmoqdagi neyronlarni faollashtirish va nonlinearlikni kiritadigan matematik funksiyalar",
        explanationRu:
          "Функции активации - это математические функции, которые добавляют нелинейность в нейронные сети",
        explanationEn:
          "Activation Functions add non-linearity to neural networks, allowing them to learn complex patterns",
      },
      {
        id: 5,
        questionUz: "Backpropagation nima?",
        questionRu: "Что такое обратное распространение?",
        questionEn: "What is Backpropagation?",
        options: [
          {
            id: "a",
            textUz: "Neural tarmoqdagi xatolarni orqaga qaytarish usuli",
            textRu: "Метод распространения ошибок в обратном направлении",
            textEn: "A method to calculate gradients by propagating error backward",
          },
          {
            id: "b",
            textUz: "Orqaga borish jarayoni",
            textRu: "Процесс идти назад",
            textEn: "Going backward process",
          },
          {
            id: "c",
            textUz: "Raqamni ko'paytiradigan usul",
            textRu: "Метод умножения чисел",
            textEn: "Number multiplication method",
          },
          {
            id: "d",
            textUz: "Modeli o'rganish",
            textRu: "Обучение модели",
            textEn: "Model learning",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Backpropagation neural tarmoqdagi xatolarni orqaga qaytarish yo'li bilan gradientlarni hisoblash usuli",
        explanationRu:
          "Обратное распространение - это алгоритм для вычисления градиентов путем распространения ошибок назад через сеть",
        explanationEn: "Backpropagation is the algorithm for training neural networks by computing gradients",
      },
      {
        id: 6,
        questionUz: "Dropout nima?",
        questionRu: "Что такое Dropout?",
        questionEn: "What is Dropout?",
        options: [
          {
            id: "a",
            textUz: "Overfitting'ni oldini olish uchun random neyronlarni deaktivatsiya qilish",
            textRu: "Отключение случайных нейронов для предотвращения переобучения",
            textEn: "Randomly deactivating neurons to prevent overfitting",
          },
          {
            id: "b",
            textUz: "Modeli tushirish",
            textRu: "Удаление модели",
            textEn: "Removing model",
          },
          {
            id: "c",
            textUz: "Malakalarni to'xtatish",
            textRu: "Остановка навыков",
            textEn: "Stopping skills",
          },
          {
            id: "d",
            textUz: "Hech narsa",
            textRu: "Ничего",
            textEn: "Nothing",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Dropout neyronlarning bir qismini tasodifiy tarzda o'chirib overfitting'ni oldini oluvchi texnika",
        explanationRu: "Dropout - это техника, которая случайно отключает нейроны для предотвращения переобучения",
        explanationEn:
          "Dropout is a regularization technique that randomly disables neurons during training to prevent overfitting",
      },
      {
        id: 7,
        questionUz: "Batch Normalization nima?",
        questionRu: "Что такое нормализация пакета?",
        questionEn: "What is Batch Normalization?",
        options: [
          {
            id: "a",
            textUz: "Ma'lumotlarni normal o'lchovga keltiradigan usul",
            textRu: "Метод приведения данных к нормальному масштабу",
            textEn: "A technique to normalize input data to a standard scale",
          },
          {
            id: "b",
            textUz: "Paketera qadim",
            textRu: "Древний пакет",
            textEn: "Ancient package",
          },
          {
            id: "c",
            textUz: "Quti narmalizatsiyasi",
            textRu: "Нормализация коробки",
            textEn: "Box normalization",
          },
          {
            id: "d",
            textUz: "Modeli xizmat",
            textRu: "Сервис модели",
            textEn: "Model service",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Batch Normalization neural tarmoqning har bir qatlamining kirishy tartibini normallashtirish texnikasi",
        explanationRu: "Нормализация пакета - это техника для стандартизации входа каждого слоя нейронной сети",
        explanationEn:
          "Batch Normalization standardizes the input to each layer, improving training speed and stability",
      },
      {
        id: 8,
        questionUz: "Transfer Learning nima?",
        questionRu: "Что такое трансферное обучение?",
        questionEn: "What is Transfer Learning?",
        options: [
          {
            id: "a",
            textUz: "Bir vazifada o'rganiladigan modelni boshqa vazifada qo'llash",
            textRu: "Использование модели, обученной на одной задаче, для другой задачи",
            textEn: "Using a pre-trained model on a new task",
          },
          {
            id: "b",
            textUz: "O'rganing o'tkazish jarayoni",
            textRu: "Процесс передачи обучения",
            textEn: "Teaching transfer process",
          },
          {
            id: "c",
            textUz: "Ma'lumotlarni o'tkazish",
            textRu: "Передача данных",
            textEn: "Data transfer",
          },
          {
            id: "d",
            textUz: "Modeli o'zgartiradigan jaray",
            textRu: "Процесс изменения модели",
            textEn: "Model change process",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Transfer Learning bir vazifada o'rganiladigan modelni boshqa o'xshash vazifada qayta ishlatiladigan usul",
        explanationRu:
          "Трансферное обучение - это использование модели, уже обученной на одной задаче, для новой похожей задачи",
        explanationEn: "Transfer Learning leverages knowledge from a model trained on one task to solve a related task",
      },
      {
        id: 9,
        questionUz: "Data Augmentation nima?",
        questionRu: "Что такое дополнение данных?",
        questionEn: "What is Data Augmentation?",
        options: [
          {
            id: "a",
            textUz: "O'rganing ma'lumotlarni ko'paytiradigan usul",
            textRu: "Метод увеличения обучающих данных",
            textEn: "Technique to artificially increase the amount of training data",
          },
          {
            id: "b",
            textUz: "Ma'lumotlarni to'xtatish",
            textRu: "Остановка данных",
            textEn: "Stopping data",
          },
          {
            id: "c",
            textUz: "Rang o'zgartiradigan usul",
            textRu: "Метод изменения цвета",
            textEn: "Color changing method",
          },
          {
            id: "d",
            textUz: "Raqamni ko'paytiradigan usul",
            textRu: "Метод увеличения чисел",
            textEn: "Number multiplication method",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Data Augmentation asl ma'lumotlarni o'zgartirib yoki buzilib o'rganing ma'lumotlarni ko'paytiradigan usul",
        explanationRu:
          "Дополнение данных - это техника увеличения объема обучающих данных путем создания модифицированных копий",
        explanationEn:
          "Data Augmentation artificially increases training data by creating variations of existing samples",
      },
      {
        id: 10,
        questionUz: "Attention Mechanism nima?",
        questionRu: "Что такое механизм внимания?",
        questionEn: "What is Attention Mechanism?",
        options: [
          {
            id: "a",
            textUz: "Modeli ma'lumotlarning eng muhim qismlarga diqqat berish mexanizmi",
            textRu: "Механизм, позволяющий модели сосредоточиться на важных частях данных",
            textEn: "A mechanism allowing the model to focus on important parts of the input",
          },
          {
            id: "b",
            textUz: "Insonning e'tibori jarayoni",
            textRu: "Процесс внимания человека",
            textEn: "Human attention process",
          },
          {
            id: "c",
            textUz: "Vazifa diqqat mexanizmi",
            textRu: "Механизм внимания задачи",
            textEn: "Task attention mechanism",
          },
          {
            id: "d",
            textUz: "Teleskopi mexanizm",
            textRu: "Телескопический механизм",
            textEn: "Telescopic mechanism",
          },
        ],
        correctAnswerId: "a",
        explanationUz:
          "Attention Mechanism modeli uzun ketma-ketliklarning eng muhim qismlarga e'tibor berishini o'rgatadigan texnika",
        explanationRu:
          "Механизм внимания - это техника, которая позволяет модели сосредоточиться на наиболее релевантных частях данных",
        explanationEn:
          "Attention Mechanism allows models to focus on relevant parts of input data for better predictions",
      },
    ],
  },
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showExplanation, setShowExplanation] = useState(false)

  const quiz = quizData[params.id]

  if (!quiz) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "uz" ? "Test topilmadi" : language === "ru" ? "Тест не найден" : "Quiz not found"}
          </h1>
          <Button asChild>
            <Link href="/tests">
              {language === "uz" ? "Testlarga qaytish" : language === "ru" ? "Вернуться к тестам" : "Back to Quizzes"}
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  const questions = quiz.questions
  const currentQ = questions[currentQuestion]

  const getQuestionText = () => {
    if (language === "uz") return currentQ.questionUz
    if (language === "ru") return currentQ.questionRu
    return currentQ.questionEn
  }

  const getOptionText = (option: (typeof currentQ.options)[0]) => {
    if (language === "uz") return option.textUz
    if (language === "ru") return option.textRu
    return option.textEn
  }

  const getExplanation = () => {
    if (language === "uz") return currentQ.explanationUz
    if (language === "ru") return currentQ.explanationRu
    return currentQ.explanationEn
  }

  const handleAnswer = (optionId: string) => {
    const isCorrect = optionId === currentQ.correctAnswerId
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionId })

    if (isCorrect && !selectedAnswers[currentQuestion]) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedAnswers({})
    setShowExplanation(false)
  }

  const percentage = Math.round((score / questions.length) * 100)

  if (showResults) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                {language === "uz" ? "Natija" : language === "ru" ? "Результаты" : "Your Results"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="text-6xl font-bold text-primary">{percentage}%</div>
                <div className="text-2xl font-semibold">
                  {score} / {questions.length}{" "}
                  {language === "uz" ? "savol" : language === "ru" ? "вопросов" : "questions"}
                </div>

                <div className="mt-8">
                  {percentage >= 80 ? (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg">
                      <p className="text-lg font-semibold">
                        {language === "uz"
                          ? "Ajoyib! Siz testni muvaffaqiyatli yakunladingiz!"
                          : language === "ru"
                            ? "Отлично! Вы успешно прошли тест!"
                            : "Excellent! You passed the quiz!"}
                      </p>
                    </div>
                  ) : percentage >= 50 ? (
                    <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg">
                      <p className="text-lg font-semibold">
                        {language === "uz"
                          ? "Yaxshi! Ammo biroq ko'proq o'rganish kerak"
                          : language === "ru"
                            ? "Хорошо! Но нужно еще учиться"
                            : "Good effort! Keep learning"}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                      <p className="text-lg font-semibold">
                        {language === "uz"
                          ? "Yana chuqur o'rganish kerak. Qayta harakat qiling!"
                          : language === "ru"
                            ? "Нужно больше учиться. Попробуйте еще раз!"
                            : "Keep practicing! Try again"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button onClick={handleRestart} size="lg">
                    {language === "uz" ? "Qayta boshlash" : language === "ru" ? "Начать заново" : "Retake Quiz"}
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/tests">
                      {language === "uz"
                        ? "Boshqa testlarga o'tish"
                        : language === "ru"
                          ? "К другим тестам"
                          : "Back to Quizzes"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answer Review */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "uz" ? "Javoblaringiz" : language === "ru" ? "Ваши ответы" : "Your Answers"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const selectedId = selectedAnswers[idx]
                  const selectedOption = q.options.find((o) => o.id === selectedId)
                  const isCorrect = selectedId === q.correctAnswerId

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        isCorrect
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                      }`}
                    >
                      <div className="font-semibold mb-2">
                        {language === "uz"
                          ? `Savol ${idx + 1}`
                          : language === "ru"
                            ? `Вопрос ${idx + 1}`
                            : `Question ${idx + 1}`}
                        {isCorrect ? " ✓" : " ✗"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === "uz" ? q.questionUz : language === "ru" ? q.questionRu : q.questionEn}
                      </div>
                      {selectedOption && (
                        <div className="text-sm mt-2">
                          {language === "uz"
                            ? "Sizning javobingiz:"
                            : language === "ru"
                              ? "Ваш ответ:"
                              : "Your answer:"}{" "}
                          {language === "uz"
                            ? selectedOption.textUz
                            : language === "ru"
                              ? selectedOption.textRu
                              : selectedOption.textEn}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{quiz.titleUz || quiz.titleRu || quiz.titleEn}</h1>
          <p className="text-muted-foreground mb-4">
            {language === "uz"
              ? `Savol ${currentQuestion + 1} / ${questions.length}`
              : language === "ru"
                ? `Вопрос ${currentQuestion + 1} / ${questions.length}`
                : `Question ${currentQuestion + 1} / ${questions.length}`}
          </p>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{getQuestionText()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion] === option.id
                const isCorrect = option.id === currentQ.correctAnswerId
                const showCorrect = showExplanation && isCorrect
                const showIncorrect = showExplanation && isSelected && !isCorrect

                return (
                  <button
                    key={option.id}
                    onClick={() => !showExplanation && handleAnswer(option.id)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : showIncorrect
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-inherit flex items-center justify-center mt-1">
                        {isSelected && <div className="w-3 h-3 bg-current rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{getOptionText(option)}</p>
                        {showCorrect && (
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            {language === "uz" ? "To'g'ri!" : language === "ru" ? "Правильно!" : "Correct!"}
                          </p>
                        )}
                        {showIncorrect && (
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            {language === "uz" ? "Noto'g'ri" : language === "ru" ? "Неправильно" : "Incorrect"}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-lg">
                {language === "uz" ? "Tushuntirish" : language === "ru" ? "Объяснение" : "Explanation"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{getExplanation()}</p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1)
                setShowExplanation(false)
              }
            }}
            disabled={currentQuestion === 0}
          >
            {language === "uz" ? "Oldingi" : language === "ru" ? "Назад" : "Previous"}
          </Button>

          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion]}>
            {currentQuestion === questions.length - 1
              ? language === "uz"
                ? "Tugatish"
                : language === "ru"
                  ? "Завершить"
                  : "Finish"
              : language === "uz"
                ? "Keyingi"
                : language === "ru"
                  ? "Далее"
                  : "Next"}
          </Button>
        </div>
      </div>
    </main>
  )
}
