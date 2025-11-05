"use client"

import { useLanguage } from "@/lib/language-context"
import { LANGUAGES } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const currentLang = LANGUAGES[language]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:inline text-sm">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(LANGUAGES).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setLanguage(key as typeof language)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-lg">{value.flag}</span>
            <span>{value.name}</span>
            {key === language && <span className="ml-auto text-xs font-bold">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
