import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Compass } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface NavProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Nav({ theme, toggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/feed', label: 'Feed' },
    { to: '/insights', label: 'Insights' },
    { to: '/#about', label: 'About' },
  ]

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
        background: scrolled ? 'var(--surface)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow)' : 'none',
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl text-white shadow">
            <Compass size={20} />
          </span>
          <span className="text-lg">NORTH</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          {links.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:opacity-100"
                style={{
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </header>
  )
}
