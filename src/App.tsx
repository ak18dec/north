import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Generation from './pages/Generation'
import Feed from './pages/Feed'
import ArticleDetail from './pages/ArticleDetail'
import Insights from './pages/Insights'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  // The generation page is a full-screen experience without the nav.
  const hideNav = location.pathname === '/generation'

  return (
    <>
      {!hideNav && <Nav theme={theme} toggleTheme={toggleTheme} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
