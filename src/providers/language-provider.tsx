'use client';
import { createContext, useContext } from 'react';

const LangContext = createContext<string | null>(null);

export default function LangProvider({ lang, children }: { lang: string; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  const lang = useContext(LangContext);
  if (!lang) {
    throw new Error('useLang must be used within LangProvider');
  }
  return lang;
}
