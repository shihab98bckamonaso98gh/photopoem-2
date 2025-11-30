
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider, useLanguage } from "@/components/providers/language-provider";

// Inner component to use useLanguage hook for dynamic title and meta description
function DynamicMetaSetter() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update document title dynamically on client-side
    document.title = t('app.title');
    
    // Update meta description dynamically on client-side
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', t('app.description'));
    }
  }, [t, language]);

  return null; // This component doesn't render anything itself
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <DynamicMetaSetter /> {/* Component to handle dynamic title and meta description */}
        {children}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
