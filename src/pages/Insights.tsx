import { motion } from 'framer-motion'
import { Bookmark, BookOpen, Zap, EyeOff, ArrowRight, Flame, ThumbsUp } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import MetricCard from '../components/MetricCard'
import { StaggerReveal, StaggerItem } from '../components/StaggerReveal'
import { useLocalStorage } from '../hooks/useLocalStorage'

const skillGaps = [
  {
    current: 'Spring Boot',
    emerging: 'AI Tooling',
    suggestion: 'Explore AI integrations in the Spring ecosystem (Spring AI, RAG patterns).',
  },
  {
    current: 'AWS',
    emerging: 'Platform Engineering',
    suggestion: 'Learn Kubernetes and GitOps patterns to design internal golden paths.',
  },
]

// Mon–Sun, true = active learning day
const streak = [true, true, false, true, true, true, false]
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Insights() {
  const [saved] = useLocalStorage<string[]>('north-saved', [])

  const metrics = [
    { value: String(Math.max(saved.length, 3)), label: 'Saved', icon: <Bookmark size={18} /> },
    { value: '1', label: 'Read', icon: <BookOpen size={18} /> },
    { value: '8', label: 'High Impact', icon: <Zap size={18} /> },
    { value: '2', label: 'Ignored', icon: <EyeOff size={18} /> },
  ]

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-28">
        <h1 className="text-4xl font-extrabold tracking-tight">Your learning intelligence</h1>
        <p className="mt-2 text-secondary">
          A read on where your attention is going — and where it could go next.
        </p>

        {/* Metrics */}
        <StaggerReveal onScroll className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard key={m.label} value={m.value} label={m.label} icon={m.icon} />
          ))}
        </StaggerReveal>

        {/* Skill gaps */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Growth opportunities</h2>
          <p className="mt-1 text-secondary">Where your current strengths meet what&apos;s rising.</p>
          <StaggerReveal onScroll className="mt-5 grid gap-4 md:grid-cols-2">
            {skillGaps.map((gap) => (
              <StaggerItem key={gap.current}>
                <div className="glass glass-hover flex h-full flex-col gap-4 rounded-2xl p-6" style={{ borderRadius: 16 }}>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span
                      className="rounded-lg px-3 py-1.5"
                      style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
                    >
                      {gap.current}
                    </span>
                    <ArrowRight size={16} className="text-secondary" />
                    <span className="rounded-lg px-3 py-1.5 text-white gradient-bg">{gap.emerging}</span>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: 'var(--surface-hover)' }}>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-secondary">
                      Suggested
                    </p>
                    <p className="text-sm leading-relaxed">{gap.suggestion}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </section>

        {/* Streak + quality */}
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-6" style={{ borderRadius: 16 }}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Flame size={20} className="text-accent-violet" /> Weekly streak
            </h2>
            <p className="mt-1 text-sm text-secondary">5 of 7 days learning this week.</p>
            <div className="mt-5 flex items-center justify-between">
              {streak.map((active, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      background: active ? 'linear-gradient(120deg, #3B82F6, #7C3AED)' : 'var(--surface-hover)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {active && <Flame size={15} className="text-white" />}
                  </motion.span>
                  <span className="text-xs text-secondary">{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass flex flex-col justify-center rounded-2xl p-6" style={{ borderRadius: 16 }}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <ThumbsUp size={20} className="text-accent-blue" /> Recommendation quality
            </h2>
            <p className="mt-3 text-4xl font-extrabold tracking-tight gradient-text">87%</p>
            <p className="mt-1 text-sm text-secondary">of saved items were rated useful.</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
              <motion.div
                className="h-full rounded-full gradient-bg"
                initial={{ width: 0 }}
                whileInView={{ width: '87%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
