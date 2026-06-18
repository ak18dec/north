import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Check } from 'lucide-react'

const stages = [
  'Understanding your profile…',
  'Scanning 847 signals…',
  'Finding opportunities…',
  'Ranking recommendations…',
  'Building your North…',
]

const STAGE_MS = 650

export default function Generation() {
  const navigate = useNavigate()
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (stage >= stages.length) {
      const done = setTimeout(() => navigate('/feed'), 400)
      return () => clearTimeout(done)
    }
    const timer = setTimeout(() => setStage((s) => s + 1), STAGE_MS)
    return () => clearTimeout(timer)
  }, [stage, navigate])

  const progress = Math.min(stage / stages.length, 1)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className="relative mb-10 flex h-24 w-24 items-center justify-center"
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, var(--accent-blue), var(--accent-violet), transparent)',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span
          className="absolute inset-1 flex items-center justify-center rounded-full"
          style={{ background: 'var(--bg)' }}
        >
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          >
            <Compass size={34} className="text-accent-violet" />
          </motion.span>
        </span>
      </motion.div>

      <div className="h-8 overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="text-xl font-semibold tracking-tight"
          >
            {stage < stages.length ? stages[stage] : 'Ready.'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* progress bar */}
      <div
        className="mt-8 h-1.5 w-64 overflow-hidden rounded-full"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          className="h-full rounded-full gradient-bg"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* stage checklist */}
      <div className="mt-10 flex flex-col gap-2.5">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-2.5 text-sm">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full transition-colors"
              style={{
                background: i < stage ? 'var(--accent-violet)' : 'var(--surface-hover)',
                border: '1px solid var(--border)',
              }}
            >
              {i < stage && <Check size={12} className="text-white" />}
            </span>
            <span style={{ color: i <= stage ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
