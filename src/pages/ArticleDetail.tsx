import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Gauge,
  TrendingUp,
  CheckCircle2,
  ListPlus,
  Sparkles,
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { getRecommendationById } from '../data/recommendations'
import { useLocalStorage } from '../hooks/useLocalStorage'

const difficultyColor: Record<string, string> = {
  Easy: '#10B981',
  Medium: '#F59E0B',
  Hard: '#EF4444',
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const rec = id ? getRecommendationById(id) : undefined
  const [queue, setQueue] = useLocalStorage<string[]>('north-queue', [])

  if (!rec) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-2xl px-5 pt-32 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link
            to="/feed"
            className="mt-4 inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} /> Back to feed
          </Link>
        </div>
      </PageTransition>
    )
  }

  const inQueue = queue.includes(rec.id)
  const toggleQueue = () => {
    setQueue((prev) => (prev.includes(rec.id) ? prev.filter((q) => q !== rec.id) : [...prev, rec.id]))
  }

  // Build a few mock paragraphs from the summary for a fuller read.
  const paragraphs = [
    rec.summary,
    `The shift here is less about a single feature and more about a change in how teams operate. Engineers who internalize ${rec.tags[0]} early tend to make better architectural calls and avoid rework that compounds over quarters. The payoff is rarely immediate, but it is durable.`,
    `In practice, adoption looks incremental: a proof of concept, a measured rollout, and a feedback loop that turns lessons into team conventions. Treating it as a learning project rather than a big-bang migration keeps risk low while the value becomes visible to stakeholders.`,
    `The teams getting outsized leverage from ${rec.category.toLowerCase()} work are the ones who pair the new capability with strong fundamentals — testing, observability, and clear ownership. That combination is exactly what distinguishes senior impact from individual output.`,
  ]

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-5 pb-32 pt-24">
        <button
          onClick={() => navigate('/feed')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-secondary transition-opacity hover:opacity-70"
        >
          <ArrowLeft size={16} /> Back to feed
        </button>

        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-secondary">
          <span className="rounded-full bg-accent-blue/10 px-2.5 py-0.5 font-semibold text-accent-blue">
            {rec.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {rec.time}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles size={14} /> {rec.score}% relevant
          </span>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight">{rec.title}</h1>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {rec.tags.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass mt-8 rounded-2xl p-6"
          style={{ borderRadius: 16 }}
        >
          <h2 className="mb-3 text-xl font-bold">Summary</h2>
          <div className="flex flex-col gap-4 text-[15px] leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.section>

        {/* Why it matters to you */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass mt-6 rounded-2xl p-6"
          style={{ borderRadius: 16, borderLeft: '3px solid var(--accent-violet)' }}
        >
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <TrendingUp size={20} className="text-accent-violet" /> Why this matters to you
          </h2>
          <p className="text-[15px] leading-relaxed">{rec.explanation}</p>
        </motion.section>

        {/* Key concepts */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass mt-6 rounded-2xl p-6"
          style={{ borderRadius: 16 }}
        >
          <h2 className="mb-3 text-xl font-bold">Key concepts</h2>
          <ul className="flex flex-col gap-2.5">
            {rec.keyConcepts.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[15px]">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-blue" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Next step */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl p-6 text-white"
          style={{ borderRadius: 16, background: 'linear-gradient(120deg, #3B82F6, #7C3AED)' }}
        >
          <h2 className="mb-2 text-xl font-bold">Suggested next step</h2>
          <p className="text-[15px] leading-relaxed opacity-95">{rec.nextStep}</p>
        </motion.section>

        {/* Learning ROI */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass mt-6 grid grid-cols-2 gap-4 rounded-2xl p-6"
          style={{ borderRadius: 16 }}
        >
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
              <Gauge size={14} /> Difficulty
            </p>
            <p className="text-2xl font-extrabold" style={{ color: difficultyColor[rec.difficulty] }}>
              {rec.difficulty}
            </p>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
              <TrendingUp size={14} /> Expected payoff
            </p>
            <p className="text-2xl font-extrabold gradient-text">{rec.payoff}</p>
          </div>
        </motion.section>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-5 pb-5">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={toggleQueue}
            className="glass flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold transition-transform hover:scale-[1.01]"
            style={{
              borderRadius: 16,
              background: inQueue ? 'var(--surface)' : 'linear-gradient(120deg, #3B82F6, #7C3AED)',
              color: inQueue ? 'var(--text-primary)' : '#fff',
            }}
          >
            {inQueue ? (
              <>
                <CheckCircle2 size={18} /> Added to Learning Queue
              </>
            ) : (
              <>
                <ListPlus size={18} /> Add to Learning Queue
              </>
            )}
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
