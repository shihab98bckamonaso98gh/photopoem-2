
"use client";

import PhotoPoemForm from '@/components/PhotoPoemForm';
import { Camera } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/providers/language-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TelegramIcon } from '@/components/icons/telegram-icon';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export default function Home() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <Camera className="h-8 w-8 text-primary" />
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
              {t('header.title')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggleButton />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <PhotoPoemForm />
      </main> 
      <footer className="bg-card shadow-sm py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p className="mt-4">{t('footer.developedBy')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Button asChild className="w-full sm:w-auto">
                  <Link href="https://t.me/shihab_me" target="_blank" rel="noopener noreferrer">
                      <TelegramIcon className="mr-2 h-5 w-5" />
                      {t('footer.telegramButton')}
                  </Link>
              </Button>
              <Button asChild className="w-full sm:w-auto">
                  <Link href="https://wa.me/8801755163404" target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="mr-2 h-5 w-5" />
                      {t('footer.whatsappButton')}
                  </Link>
              </Button>
          </div>
          <p className="mt-4">{t('footer.copyright', { year: 2025 })}</p>
        </div>
      </footer>
    </div>
  );
}
