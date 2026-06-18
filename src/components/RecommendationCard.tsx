import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Bookmark, BookOpen, X, TrendingUp } from 'lucide-react'
import { Recommendation } from '../data/recommendations'
import { staggerItem } from '../animations/variants'

interface RecommendationCardProps {
  rec: Recommendation
  saved: boolean
  onToggleSave: (id: string) => void
  onDismiss: (id: string) => void
}

const priorityColor: Record<Recommendation['priority'], string> = {
  HIGH: '#EF4444',
  MEDIUM: '#F59E0B',
  LOW: '#10B981',
}

export default function RecommendationCard({
  rec,
  saved,
  onToggleSave,
  onDismiss,
}: RecommendationCardProps) {
  const navigate = useNavigate()

  return (
    <motion.article
      layout
      variants={staggerItem}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      className="glass glass-hover flex flex-col gap-4 rounded-2xl p-6"
      style={{ borderRadius: 16 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide text-white"
            style={{ background: priorityColor[rec.priority] }}
          >
            {rec.priority}
          </span>
          <span className="text-xs font-medium text-secondary">{rec.category}</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-secondary">
          <Clock size={13} /> {rec.time}
        </span>
      </div>

      <h3 className="text-lg font-bold leading-snug tracking-tight">{rec.title}</h3>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-secondary">
          <span>Relevance</span>
          <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
            {rec.score}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
          <motion.div
            className="h-full rounded-full gradient-bg"
            initial={{ width: 0 }}
            animate={{ width: `${rec.score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="rounded-xl p-3" style={{ background: 'var(--surface-hover)' }}>
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-secondary">
          Why this matters
        </p>
        <p className="text-sm leading-relaxed">{rec.explanation}</p>
      </div>

      <p className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--accent-violet)' }}>
        <TrendingUp size={15} /> {rec.impact}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {rec.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-1">
        <button
          onClick={() => navigate(`/article/${rec.id}`)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl gradient-bg px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          <BookOpen size={15} /> Read Summary
        </button>
        <button
          onClick={() => onToggleSave(rec.id)}
          aria-label="Save"
          className="glass flex h-9 w-10 items-center justify-center rounded-xl transition-colors"
          style={{ color: saved ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
        >
          <Bookmark size={16} fill={saved ? 'var(--accent-blue)' : 'none'} />
        </button>
        <button
          onClick={() => onDismiss(rec.id)}
          aria-label="Not relevant"
          title="Not relevant"
          className="glass flex h-9 w-10 items-center justify-center rounded-xl text-secondary transition-colors hover:opacity-70"
        >
          <X size={16} />
        </button>
      </div>
    </motion.article>
  )
}
