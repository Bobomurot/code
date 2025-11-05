"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { type Language, defaultLanguage } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        language: mounted ? language : defaultLanguage,
        setLanguage: (lang: Language) => {
          setLanguageState(lang)
          localStorage.setItem("language", lang)
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
