import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import RecommendationCard from '../components/RecommendationCard'
import { StaggerReveal } from '../components/StaggerReveal'
import { recommendations } from '../data/recommendations'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getGreeting, getTodayLabel } from '../utils/time'

export default function Feed() {
  const [saved, setSaved] = useLocalStorage<string[]>('north-saved', [])
  const [dismissed, setDismissed] = useLocalStorage<string[]>('north-dismissed', [])

  const greeting = useMemo(() => getGreeting(), [])
  const today = useMemo(() => getTodayLabel(), [])

  const visible = recommendations.filter((r) => !dismissed.includes(r.id))

  const toggleSave = (id: string) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const dismiss = (id: string) => {
    setDismissed((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-secondary">{today}</p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{greeting}</h1>
            <p className="mt-2 text-lg text-secondary">
              Here&apos;s what deserves your attention today.
            </p>
          </div>
          <Link
            to="/insights"
            className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
            style={{ borderRadius: 12 }}
          >
            <BarChart3 size={16} className="text-accent-blue" /> View insights
          </Link>
        </div>

        {visible.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center" style={{ borderRadius: 16 }}>
            <p className="text-lg font-semibold">You&apos;ve cleared your feed.</p>
            <p className="mt-2 text-secondary">
              Nice work staying intentional. Reset dismissed items to see them again.
            </p>
            <button
              onClick={() => setDismissed([])}
              className="mt-4 rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white"
            >
              Reset feed
            </button>
          </div>
        ) : (
          <StaggerReveal className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  saved={saved.includes(rec.id)}
                  onToggleSave={toggleSave}
                  onDismiss={dismiss}
                />
              ))}
            </AnimatePresence>
          </StaggerReveal>
        )}
      </div>
    </PageTransition>
  )
}
