import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router'
import { Layout } from './Layout.tsx'
import Home from './routes/Home/Home.tsx'

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
