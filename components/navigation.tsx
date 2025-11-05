"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const { language } = useLanguage()

  const navItems = [
    { href: "/", label: t("home", language) },
    { href: "/courses", label: t("courses", language) },
    { href: "/tests", label: t("tests", language) },
    { href: "/community", label: t("community", language) },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">🧠</span>
            <span className="hidden sm:inline">AILearn</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild className="text-sm font-medium">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">{t("myProfile", language)}</Link>
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
