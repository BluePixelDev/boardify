import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router'
import { Layout } from './Layout.tsx'
import Home from '@routes/Home/Home.tsx'

import i18n from "i18next";
import { initReactI18next } from 'react-i18next/initReactI18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '@locales/en/translation.json';
import csTranslation from '@locales/cs/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'cs',
    resources: {
      en: enTranslation,
      cs: csTranslation
    },
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename={'/'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
